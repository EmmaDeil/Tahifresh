import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { count } = useCart();
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav('/shop?q=' + encodeURIComponent(q));
    setOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement">
        Don't miss our holiday offer - up to 50% OFF!
      </div>

      {/* Header */}
      <header>
        <Link to="/" className="logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Tahi Fresh" className="logo-img" />
          <span>Tahi</span>Fresh
        </Link>

        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'open' : ''}>
          {['Home', 'Shop', 'About', 'Contact', 'FAQ'].map((x) => (
            <NavLink
              key={x}
              onClick={() => setOpen(false)}
              to={x === 'Home' ? '/' : '/' + x.toLowerCase()}
            >
              {x}
            </NavLink>
          ))}
        </nav>

        <form className="search" onSubmit={submit}>
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search groceries"
          />
        </form>

        <div className="actions">
          <Link to="/account" aria-label="Account">
            <User />
          </Link>
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            <ShoppingBag />
            <b>{count}</b>
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        <div>
          <Link className="logo light" to="/">
            <span>Fresh</span>Basket
          </Link>
          <p>Welcome to Tahi World</p>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/shop">All products</Link>
          <Link to="/shop?category=Parfait">Parfait</Link>
          <Link to="/shop?category=Yogurt">Yogurt</Link>
          <Link to="/shop?category=Bundles">Bundles</Link>
          <Link to="/shop?category=Zobo">Zobo</Link>
          <Link to="/shop?category=Waffles">Waffles</Link>
          <Link to="/shop?category=Banana bread">Banana Bread</Link>
          <Link to="/shop?category=Pancake">Pancake</Link>
        </div>

        <div>
          <h4>Customer care</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping &amp; returns</Link>
        </div>

        <div>
          <h4>Legal</h4>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms of service</Link>
        </div>

        <small>© 2026 Tahi Fresh. Original demonstration storefront.</small>
      </footer>
    </>
  );
}
