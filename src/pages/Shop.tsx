import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '';
  const cat = sp.get('category') || '';
  const sort = sp.get('sort') || 'featured';

  const list = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (!cat || p.category === cat) &&
            (!q ||
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.category.toLowerCase().includes(q.toLowerCase()))
        )
        .sort((a, b) =>
          sort === 'low'
            ? a.price - b.price
            : sort === 'high'
            ? b.price - a.price
            : Number(b.featured) - Number(a.featured)
        ),
    [q, cat, sort]
  );

  const update = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    v ? n.set(k, v) : n.delete(k);
    setSp(n);
  };

  return (
    <section className="section">
      <div className="page-title">
        <span className="eyebrow">Fresh selection</span>
        <h1>Shop groceries</h1>
        <p>
          {list.length} products found{q ? ` for "${q}"` : ''}.
        </p>
      </div>

      <div className="shop-toolbar">
        <select value={cat} onChange={(e) => update('category', e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {list.length ? (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No matching products</h2>
          <p>Try another search or category.</p>
        </div>
      )}
    </section>
  );
}
