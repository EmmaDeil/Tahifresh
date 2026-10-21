import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, setQty, remove, subtotal } = useCart();

  if (!items.length) {
    return (
      <section className="empty">
        <span>🛒</span>
        <h1>Your basket is empty</h1>
        <p>Add fresh groceries to get started.</p>
        <Link className="btn primary" to="/shop">
          Start shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="page-title">
        <h1>Your basket</h1>
        <p>Review your items before checkout.</p>
      </div>

      <div className="cart-layout">
        <div>
          {items.map((x) => (
            <div className="cart-row" key={x.id}>
              <div className="cart-thumb">{x.emoji}</div>

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
