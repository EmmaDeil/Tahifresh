import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Product() {
  const { id } = useParams();
  const p = products.find((x) => x.id === Number(id));
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  if (!p) {
    return (
      <section className="empty">
        <h1>Product not found</h1>
        <Link to="/shop">Return to shop</Link>
      </section>
    );
  }

  return (
    <section className="section product-page">
      {/* <div className="product-large">{p.image && <img src={p.image} alt={p.name} loading="lazy" />}</div> */}

      <div className="bg-[#F4F1E1] h-48 rounded-t-md overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <span className="eyebrow">{p.category}</span>
        <h1>{p.name}</h1>
        <p className="price">
          ₦{p.price.toLocaleString()} <small>/ {p.unit}</small>
        </p>
        <p>{p.description}</p>

        <div className="qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus />
          </button>
          <b>{qty}</b>
          <button onClick={() => setQty(qty + 1)}>
            <Plus />
          </button>
        </div>

        <button
          className="btn primary wide"
          onClick={() => Array.from({ length: qty }).forEach(() => add(p))}
        >
          Add {qty} to basket
        </button>

        <div className="assurances">
          <p>
            <Truck /> Delivery options shown at checkout
          </p>
          <p>
            <ShieldCheck /> Quality checked before dispatch
          </p>
        </div>
      </div>
    </section>
  );
}
