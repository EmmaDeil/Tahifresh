import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslations } from '../context/TranslationContext';
// 1. Import your user session context
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const { name: translations } = useTranslations();
  // 2. Retrieve the active user profile
  const { user } = useAuth();

  // 3. Define the display name with a fallback
  const displayName = user?.firstName ? `${user.firstName}'s` : 'Your';

  if (!items.length) {
    return (
      <section className="empty">
        <span>🛒</span>
        {/* Inject name into empty state */}
        <h1>{displayName} {translations?.['basket is empty'] || 'basket is empty'}</h1>
        <p>{translations?.['Add fresh items to get started.']}</p>
        <Link className="btn primary" to="/shop">
          {translations?.['Start shopping']}
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="page-title">
        {/* Inject name into active state */}
        <h1>{displayName} {translations?.['basket'] || 'basket'}</h1>
        <p>{translations?.['Review your items before checkout.']}</p>
      </div>

      <div className="cart-layout">
        <div>
          {items.map((x) => (
            <div className="cart-row" key={x.id}>
              <div className="cart-thumb">{x.image && <img src={x.image} alt={x.name} />}</div>

              <div>
                <b>{x.name}</b>
                <small>{x.unit}</small>
              </div>

              <div className="qty small">
                <button onClick={() => setQty(x.id, x.quantity - 1)}>
                  <Minus />
                </button>
                <b>{x.quantity}</b>
                <button onClick={() => setQty(x.id, x.quantity + 1)}>
                  <Plus />
                </button>
              </div>

              <strong>₦{(x.price * x.quantity).toLocaleString()}</strong>

              <button className="icon-btn" onClick={() => remove(x.id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <aside className="summary">
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
          <p className="total">
            <span>Total</span>
            <b>₦{subtotal.toLocaleString()}</b>
          </p>
          <Link className="btn primary wide" to="/checkout">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}