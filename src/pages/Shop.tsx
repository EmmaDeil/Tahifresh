import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { Empty, Eyebrow, PageTitle, ProductGrid, Section } from '../components/ui';
import { categories, products } from '../data/products';
import { media } from '../theme';

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;

  ${media.mobile} {
    display: grid;
    gap: 10px;
  }

  select {
    padding: 12px 16px;
    border: 1px solid #ccd5d0;
    border-radius: 6px;
  }
`;

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
    <Section>
      <PageTitle>
        <Eyebrow>Order your favorites</Eyebrow>
        <h1>Shop</h1>
        <p>
          {list.length} products found{q ? ` for "${q}"` : ''}.
        </p>
      </PageTitle>

      <Toolbar>
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
      </Toolbar>

      {list.length ? (
        <ProductGrid>
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </ProductGrid>
      ) : (
        <Empty as="div">
          <h2>No matching products</h2>
          <p>Try another search or category.</p>
        </Empty>
      )}
    </Section>
  );
}
