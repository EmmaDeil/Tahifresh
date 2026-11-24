import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  ButtonLink,
  Empty,
  Field,
  FormCardBox,
  FormGrid,
  PageTitle,
  RadioField,
  Section,
  Summary,
  SummaryTotal,
  twoColumnLayout,
} from '../components/ui';
import { useCart } from '../context/CartContext';
import {
  calcDeliveryFee,
  deliveryAreas,
  deliveryFees,
  FREE_DELIVERY_ABOVE,
  PICKUP_ADDRESS,
  type FulfilmentMethod,
} from '../data/delivery';
import { colors } from '../theme';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const ErrorText = styled.p`
  color: #a24b3a;
  font-weight: 600;
`;

const CheckoutForm = styled.form`
  ${twoColumnLayout}
`;

const NavChoice = styled.div`
  position: relative;
  margin-top: 12px;
  height: 48px;

  .label,
  .options {
    position: absolute;
    inset: 0;
  }

  .label {
    width: 100%;
    background: transparent;
    border: 1px solid ${colors.green};
    border-radius: 6px;
    color: ${colors.green};
    font-weight: 700;
    cursor: pointer;
  }

  .options {
    display: none;
    gap: 8px;
  }

  .options button {
    flex: 1;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
  }

  .back {
    background: transparent;
    border: 1px solid ${colors.green};
    color: ${colors.green};
  }

  .cancel {
    background: #a24b3a;
    border: 1px solid #a24b3a;
    color: #fff;
  }

  &:hover .label,
  &:focus-within .label {
    display: none;
  }

  &:hover .options,
  &:focus-within .options {
    display: flex;
  }
`;

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState<{ orderId: string; email: string; emailSent: boolean } | null>(
    null
  );
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', note: '' });
  const [method, setMethod] = useState<FulfilmentMethod>('delivery');
  const [area, setArea] = useState('');
  const [payment, setPayment] = useState<'online' | 'transfer'>('online');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const isDelivery = method === 'delivery';
  const deliveryFee = calcDeliveryFee(method, area, subtotal);
  const total = subtotal + deliveryFee;

  if (!items.length && !done) return <Navigate to="/cart" />;

  if (done) {
    return (
      <Empty>
        <span>✅</span>
        <h1>Order received</h1>
        <p>
          Your order number is <b>{done.orderId}</b>.{' '}
          {done.emailSent
            ? `A confirmation has been sent to ${done.email}.`
            : 'We could not send your confirmation email, so please keep this order number.'}
        </p>
        <ButtonLink to="/shop" style={{ marginRight: 10 }}>
          Continue shopping
        </ButtonLink>
        <ButtonLink $variant="secondary" to="/">
          Back to home
        </ButtonLink>
      </Empty>
    );
  }

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          method,
          area: isDelivery ? area : '',
          address: isDelivery ? form.address : '',
          payment,
          items: items.map((x) => ({ id: x.id, quantity: x.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not place your order.');
      clear();
      setDone({ orderId: data.orderId, email: form.email, emailSent: data.customerEmailSent });
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Could not reach the order server. Please try again shortly.'
          : (err as Error).message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section>
      <PageTitle>
        <h1>Checkout</h1>
        <p>Choose delivery or pick-up and enter your details.</p>
      </PageTitle>

      <CheckoutForm onSubmit={placeOrder}>
        <FormCardBox>
          <h2>Contact</h2>

          <FormGrid>
            <Field>
              Full name
              <input required value={form.name} onChange={set('name')} />
            </Field>
            <Field>
              Email
              <input required type="email" value={form.email} onChange={set('email')} />
            </Field>
            <Field $full>
              Phone number
              <input required type="tel" value={form.phone} onChange={set('phone')} />
            </Field>
          </FormGrid>

          <h2>Delivery method</h2>
          <RadioField>
            <input
              type="radio"
              name="method"
              checked={isDelivery}
              onChange={() => setMethod('delivery')}
            />{' '}
            Delivery
          </RadioField>
          <RadioField>
            <input
              type="radio"
              name="method"
              checked={!isDelivery}
              onChange={() => setMethod('pickup')}
            />{' '}
            Pick up on-site (free)
          </RadioField>

          {isDelivery ? (
            <FormGrid>
              <Field $full>
                Delivery area
                <select required value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Select area</option>
                  {deliveryAreas.map((a) => (
                    <option key={a} value={a}>
                      {a} - ₦{deliveryFees[a].toLocaleString()}
                    </option>
                  ))}
                </select>
              </Field>
              <Field $full>
                Street address
                <input required value={form.address} onChange={set('address')} />
              </Field>
            </FormGrid>
          ) : (
            <p>
              Collect your order at: <b>{PICKUP_ADDRESS}</b>
            </p>
          )}

          <Field>
            Order note (optional)
            <textarea rows={3} value={form.note} onChange={set('note')} />
          </Field>

          <h2>Payment</h2>
          <RadioField>
            <input
              type="radio"
              name="pay"
              checked={payment === 'online'}
              onChange={() => setPayment('online')}
            />{' '}
            Pay securely online
          </RadioField>
          <RadioField>
            <input
              type="radio"
              name="pay"
              checked={payment === 'transfer'}
              onChange={() => setPayment('transfer')}
            />{' '}
            Bank transfer
          </RadioField>
        </FormCardBox>

        <Summary>
          <h2>Your order</h2>
          {items.map((x) => (
            <p key={x.id}>
              <span>
                {x.name} × {x.quantity}
              </span>
              <b>₦{(x.price * x.quantity).toLocaleString()}</b>
            </p>
          ))}
          <hr />
          <p>
            <span>Subtotal</span>
            <b>₦{subtotal.toLocaleString()}</b>
          </p>
          <p>
            <span>{isDelivery ? 'Delivery' : 'Pick-up'}</span>
            <b>
              {isDelivery && !area
                ? 'Select an area'
                : deliveryFee
                  ? `₦${deliveryFee.toLocaleString()}`
                  : 'Free'}
            </b>
          </p>
          {isDelivery && subtotal < FREE_DELIVERY_ABOVE && (
            <small>Free delivery on orders from ₦{FREE_DELIVERY_ABOVE.toLocaleString()}.</small>
          )}
          <SummaryTotal>
            <span>Total</span>
            <b>₦{total.toLocaleString()}</b>
          </SummaryTotal>
          {error && <ErrorText role="alert">{error}</ErrorText>}
          <Button $wide disabled={submitting}>
            {submitting ? 'Placing order…' : 'Place order'}
          </Button>
          <NavChoice>
            <button type="button" className="label">
              Back / Cancel
            </button>
            <div className="options">
              <button type="button" className="back" onClick={() => nav('/cart')}>
                Back
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  clear();
                  nav('/shop');
                }}
              >
                Cancel
              </button>
            </div>
          </NavChoice>
          <small>
            Payment is confirmed with you by email after your order is received.
          </small>
        </Summary>
      </CheckoutForm>
    </Section>
  );
}
