import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ButtonLink,
  Empty,
  PageTitle,
  Qty,
  Section,
  Summary,
  SummaryTotal,
  twoColumnLayout,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslations } from '../context/TranslationContext';
import { media } from '../theme';

const CartLayout = styled.div`
  ${twoColumnLayout}
`;

const CartRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto 120px 40px;
  gap: 15px;
  align-items: center;
  border-bottom: 1px solid #e2e7e4;
  padding: 18px 0;

  > div:nth-child(2) {
    display: grid;
    gap: 6px;
  }

  ${media.tablet} {
    grid-template-columns: 65px 1fr auto;

    ${Qty} {
      grid-column: 2;
    }

    > strong {
      grid-column: 3;
      grid-row: 2;
    }
  }
`;

const CartThumb = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background: #f5f1e5;
  display: grid;
  place-items: center;
  font-size: 36px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IconButton = styled.button`
  background: none;
  border: 0;
  color: #a24b3a;
`;

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const { name: translations } = useTranslations();
  // Retrieve the active user profile
  const { user } = useAuth();

  // Define the display name with a fallback
  const displayName = user?.firstName ? `${user.firstName}'s` : 'Your';

  if (!items.length) {
    return (
      <Empty>
        <span>🛒</span>
        {/* Inject name into empty state */}
        <h1>{displayName} {translations?.['basket is empty'] || 'basket is empty'}</h1>
        <p>{translations?.['Add fresh items to get started.']}</p>
        <ButtonLink to="/shop">{translations?.['Start shopping']}</ButtonLink>
      </Empty>
    );
  }

  return (
    <Section>
      <PageTitle>
        {/* Inject name into active state */}
        <h1>{displayName} {translations?.['basket'] || 'basket'}</h1>
        <p>{translations?.['Review your items before checkout.']}</p>
      </PageTitle>

      <CartLayout>
        <div>
          {items.map((x) => (
            <CartRow key={x.id}>
              <CartThumb>{x.image && <img src={x.image} alt={x.name} />}</CartThumb>

              <div>
                <b>{x.name}</b>
                <small>{x.unit}</small>
              </div>

              <Qty $small>
                <button onClick={() => setQty(x.id, x.quantity - 1)}>
                  <Minus />
                </button>
                <b>{x.quantity}</b>
                <button onClick={() => setQty(x.id, x.quantity + 1)}>
                  <Plus />
                </button>
              </Qty>

              <strong>₦{(x.price * x.quantity).toLocaleString()}</strong>

              <IconButton onClick={() => remove(x.id)}>
                <Trash2 />
              </IconButton>
            </CartRow>
          ))}
        </div>

        <Summary>
          <h2>Order summary</h2>
          <p>
            <span>Subtotal</span>
            <b>₦{subtotal.toLocaleString()}</b>
          </p>
          <p>
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </p>
          <hr />
          <SummaryTotal>
            <span>Total</span>
            <b>₦{subtotal.toLocaleString()}</b>
          </SummaryTotal>
          <ButtonLink $wide to="/checkout">
            Proceed to checkout
          </ButtonLink>
        </Summary>
      </CartLayout>
    </Section>
  );
}
