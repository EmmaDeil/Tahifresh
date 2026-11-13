import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Empty, Eyebrow, Qty, Section, displayTitle } from '../components/ui';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { media } from '../theme';

const ProductPage = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }

  h1 {
    ${displayTitle}

    ${media.mobile} {
      font-size: 44px;
    }
  }
`;

const ImageBox = styled.div`
  background: #f4f1e1;
  height: 12rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: #e36f2d;
`;

const Assurances = styled.div`
  margin-top: 25px;

  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export default function Product() {
  const { id } = useParams();
  const p = products.find((x) => x.id === Number(id));
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  if (!p) {
    return (
      <Empty>
        <h1>Product not found</h1>
        <Link to="/shop">Return to shop</Link>
      </Empty>
    );
  }

  return (
    <ProductPage>
      <ImageBox>
        <img src={p.image} alt={p.name} loading="lazy" />
      </ImageBox>
      <div>
        <Eyebrow>{p.category}</Eyebrow>
        <h1>{p.name}</h1>
        <Price>
          ₦{p.price.toLocaleString()} <small>/ {p.unit}</small>
        </Price>
        <p>{p.description}</p>

        <Qty>
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus />
          </button>
          <b>{qty}</b>
          <button onClick={() => setQty(qty + 1)}>
            <Plus />
          </button>
        </Qty>

        <Button $wide onClick={() => Array.from({ length: qty }).forEach(() => add(p))}>
          Add {qty} to basket
        </Button>

        <Assurances>
          <p>
            <Truck /> Delivery options shown at checkout
          </p>
          <p>
            <ShieldCheck /> Quality checked before dispatch
          </p>
        </Assurances>
      </div>
    </ProductPage>
  );
}
