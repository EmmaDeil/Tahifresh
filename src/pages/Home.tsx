import { ArrowRight, CalendarCheck, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div>
          <span className="eyebrow">Tahi-fresh convenience</span>
          <h1>Crave it,</h1>
          <h1>Click it</h1>
          <p>
            Shop produce, pantry staples, proteins and curated bundles from one convenient
            storefront.
          </p>
          <div className="hero-buttons">
            <Link className="btn primary" to="/shop">
              Shop now <ArrowRight size={18} />
            </Link>
            <Link className="btn secondary" to="/about">
              Our story
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <span><img src={`${import.meta.env.BASE_URL}🥬.png`} alt="🥬" /></span>
          <span><img src={`${import.meta.env.BASE_URL}🍊.png`} alt="🍊" /></span>
          <span><img src={`${import.meta.env.BASE_URL}🥖.png`} alt="🥖" /></span>
          <span><img src={`${import.meta.env.BASE_URL}🥕.png`} alt="🥕" /></span>
          <strong>Freshness in every bite</strong>
        </div>
      </section>


      {/* Features strip */}
      <section className="features">
        <div>
          <Truck />
          <span>
            <b>Convenient delivery</b>
            <small>Doorstep service in supported areas</small>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <b>Quality selected</b>
            <small>Products checked before dispatch</small>
          </span>
        </div>
        <div>
          <CalendarCheck />
          <span>
            <b>Easy ordering</b>
            <small>Shop whenever it suits you</small>
          </span>
        </div>
      </section>

      {/* Categories */}
      <div className="ticker-container">
        <div className="ticker-track">
          {/* Content is duplicated to ensure a seamless infinite scroll */}
          <span className="ticker-item">🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</span>
          <span className="ticker-item">🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</span>
          <span className="ticker-item">🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</span>
          <span className="ticker-item">🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</span>
        </div>
      </div>
      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Browse easily</span>
            <h2>Shop by category</h2>
          </div>
          <Link to="/shop">
            View all <ArrowRight size={18} />
          </Link>
        </div>

        <div className="categories">
          {categories.map((c, i) => (
            <Link to={'/shop?category=' + encodeURIComponent(c)} key={c}>
              <span>{['🥬', '🍓', '🫘', '🥛', '🍗', '🐟', '📦'][i]}</span>
              <b>{c}</b>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="section muted">
        <div className="section-head">
          <div>
            <span className="eyebrow">Customer favourites</span>
            <h2>Featured products</h2>
          </div>
          <Link to="/shop">
            Shop all <ArrowRight size={18} />
          </Link>
        </div>

        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard p={p} key={p.id} />
            ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="promo">
        <div>
          <span className="eyebrow">Weekly essentials</span>
          <h2>Build a basket that works for your home.</h2>
          <p>Mix fresh produce, pantry goods and protein in one order.</p>
          <Link className="btn primary" to="/shop">
            Start shopping
          </Link>
        </div>
        <div className="promo-art">🛒</div>
      </section>
    </>
  );
}
