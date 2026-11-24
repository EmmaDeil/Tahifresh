import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'thahiworld@gmail.com';

// Without SMTP settings, emails are printed to the console so the flow can be tested locally
const transporter = SMTP_HOST
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    })
  : nodemailer.createTransport({ jsonTransport: true });

if (!SMTP_HOST) console.warn('SMTP_HOST not set: emails will be logged, not sent.');

const from = MAIL_FROM || SMTP_USER || 'Tahi Fresh <no-reply@tahifresh.local>';

const naira = (n) => `₦${n.toLocaleString('en-NG')}`;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function details(o) {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${esc(i.name)} (${esc(i.unit)}) × ${i.quantity}</td>` +
        `<td style="padding:6px 0;text-align:right">${naira(i.price * i.quantity)}</td></tr>`
    )
    .join('');

  const where =
    o.method === 'delivery'
      ? `Delivery to ${esc(o.address)}, ${esc(o.area)}`
      : `Pick-up at ${esc(o.address)}`;

  return `
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd;border-bottom:1px solid #ddd">${rows}</table>
    <p style="margin:12px 0 0">Subtotal: ${naira(o.subtotal)}</p>
    <p style="margin:4px 0">${o.method === 'delivery' ? 'Delivery' : 'Pick-up'}: ${o.deliveryFee ? naira(o.deliveryFee) : 'Free'}</p>
    <p style="margin:4px 0;font-size:18px"><b>Total: ${naira(o.total)}</b></p>
    <p>${where}</p>
    <p>Payment: ${esc(o.payment)}</p>
    ${o.note ? `<p>Note: ${esc(o.note)}</p>` : ''}`;
}

export async function sendOrderEmails(o) {
  const adminMail = {
    from,
    to: ADMIN_EMAIL,
    replyTo: o.customer.email,
    subject: `New order ${o.id} - ${naira(o.total)} (${o.method})`,
    html: `<h2>New order ${o.id}</h2>
      <p><b>${esc(o.customer.name)}</b><br>${esc(o.customer.email)}<br>${esc(o.customer.phone)}</p>
      ${details(o)}`,
  };

  const customerMail = {
    from,
    to: o.customer.email,
    subject: `Order received - ${o.id}`,
    html: `<h2>Thank you, ${esc(o.customer.name)}!</h2>
      <p>We have received your order <b>${o.id}</b>. We will email you as it is packed and on its way.</p>
      ${details(o)}
      <p>Tahi Fresh</p>`,
  };

  const log = (info) => !SMTP_HOST && console.log(info.message);

  // The admin must be notified, otherwise the order would be lost
  log(await transporter.sendMail(adminMail));

  try {
    log(await transporter.sendMail(customerMail));
    return { customerEmailSent: true };
  } catch (err) {
    console.error(`Customer email failed for ${o.id}`, err);
    return { customerEmailSent: false };
  }
}
