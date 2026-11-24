import crypto from 'node:crypto';
import cors from 'cors';
import express from 'express';
import { calcDeliveryFee, deliveryAreas, PICKUP_ADDRESS } from '../src/data/delivery.ts';
import { products } from '../src/data/products.ts';
import { sendOrderEmails } from './mail.js';

const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173,https://emmadeil.github.io')
  .split(',')
  .map((o) => o.trim());

const app = express();
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

// Simple in-memory limiter: 10 orders per IP per 10 minutes
const hits = new Map();
const rateLimit = (req, res, next) => {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 10) return res.status(429).json({ error: 'Too many orders, try again later.' });
  hits.set(req.ip, [...recent, now]);
  next();
};

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildOrder(body) {
  const customer = {
    name: str(body.name, 100),
    email: str(body.email, 150),
    phone: str(body.phone, 30),
  };
  const method = body.method === 'pickup' ? 'pickup' : body.method === 'delivery' ? 'delivery' : '';
  const area = str(body.area, 50);
  const address = str(body.address, 250);
  const note = str(body.note, 500);
  const payment = body.payment === 'transfer' ? 'Bank transfer' : 'Pay securely online';

  if (!customer.name) return { error: 'Name is required.' };
  if (!emailRe.test(customer.email)) return { error: 'A valid email is required.' };
  if (customer.phone.length < 7) return { error: 'A valid phone number is required.' };
  if (!method) return { error: 'Choose delivery or pick-up.' };
  if (method === 'delivery') {
    if (!deliveryAreas.includes(area)) return { error: 'Choose a valid delivery area.' };
    if (!address) return { error: 'Street address is required for delivery.' };
  }

  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 50) {
    return { error: 'Your basket is empty.' };
  }

  // Prices always come from the catalogue, never from the browser
  const items = [];
  for (const raw of body.items) {
    const product = products.find((p) => p.id === raw?.id);
    const quantity = Number(raw?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { error: 'Your basket contains an invalid item.' };
    }
    items.push({ name: product.name, unit: product.unit, price: product.price, quantity });
  }

  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const deliveryFee = calcDeliveryFee(method, area, subtotal);

  return {
    order: {
      id: `TF-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto
        .randomInt(0, 36 ** 4)
        .toString(36)
        .toUpperCase()
        .padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      customer,
      method,
      area: method === 'delivery' ? area : '',
      address: method === 'delivery' ? address : PICKUP_ADDRESS,
      note,
      payment,
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    },
  };
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/orders', rateLimit, async (req, res) => {
  const { order, error } = buildOrder(req.body || {});
  if (error) return res.status(400).json({ error });

  try {
    const result = await sendOrderEmails(order);
    res.status(201).json({
      orderId: order.id,
      total: order.total,
      deliveryFee: order.deliveryFee,
      customerEmailSent: result.customerEmailSent,
    });
  } catch (err) {
    console.error('Failed to send order emails', err);
    res.status(502).json({ error: 'We could not process your order right now. Please try again.' });
  }
});

app.listen(PORT, () => console.log(`Order server listening on http://localhost:${PORT}`));
