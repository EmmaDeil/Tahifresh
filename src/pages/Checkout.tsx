import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
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

const CheckoutForm = styled.form`
  ${twoColumnLayout}
`;

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);

  if (!items.length && !done) return <Navigate to="/cart" />;

  if (done) {
    return (
      <Empty>
        <span>✅</span>
        <h1>Order received</h1>
        <p>Your demonstration order has been created successfully.</p>
      </Empty>
    );
  }

  return (
    <Section>
      <PageTitle>
        <h1>Checkout</h1>
        <p>Enter your delivery and payment information.</p>
      </PageTitle>

      <CheckoutForm
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setDone(true);
        }}
      >
        <FormCardBox>
          <h2>Contact &amp; delivery</h2>

          <FormGrid>
            <Field>
              Full name
              <input required />
            </Field>
            <Field>
              Email
              <input required type="email" />
            </Field>
            <Field>
              Phone number
              <input required type="tel" />
            </Field>
            <Field>
              Delivery area
              <select required>
                <option value="">Select area</option>
                <option>Ikeja</option>
                <option>Victoria Island</option>
                <option>Lekki</option>
                <option>Yaba</option>
              </select>
            </Field>
            <Field $full>
              Street address
              <input required />
            </Field>
            <Field $full>
              Delivery note
              <textarea rows={3} />
            </Field>
          </FormGrid>

          <h2>Payment</h2>
          <RadioField>
            <input type="radio" name="pay" defaultChecked /> Pay securely online
          </RadioField>
          <RadioField>
            <input type="radio" name="pay" /> Bank transfer
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
          <SummaryTotal>
            <span>Total</span>
            <b>₦{subtotal.toLocaleString()}</b>
          </SummaryTotal>
          <Button $wide>Place order</Button>
          <small>
            This starter uses a demonstration checkout. Connect a payment gateway before
            production.
          </small>
        </Summary>
      </CheckoutForm>
    </Section>
  );
}
