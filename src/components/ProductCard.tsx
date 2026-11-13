import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { colors } from '../theme';
import type { Product } from '../types';

const Card = styled.article`
  background: #fff;
  border: 1px solid #e5e9e6;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px #173a2d14;
  }
`;

const Art = styled(Link)`
  display: block;
  height: 220px;
  background: linear-gradient(145deg, #f0f4e5, #f8efe3);
  overflow: hidden;
`;

const ImageBox = styled.div`
  background: #f4f1e1;
  height: 100%;
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 18px;

  h3 {
    margin: 7px 0 18px;
  }

  > small {
    color: #dd6d2d;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 18px;
    font-weight: 700;
  }

  button {
    border: 0;
    background: ${colors.green};
    color: white;
    border-radius: 6px;
    padding: 9px 16px;
  }
`;

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();

  return (
    <Card>
      <Art to={'/product/' + p.id}>
        <ImageBox>
          <img src={p.image} alt={p.name} loading="lazy" />
        </ImageBox>
      </Art>

      <Info>
        <small>{p.category}</small>

        <Link to={'/product/' + p.id}>
          <h3>{p.name}</h3>
        </Link>

        <Bottom>
          <p>
            ₦{p.price.toLocaleString()} <small>/ {p.unit}</small>
          </p>
          <button onClick={() => add(p)}>Add</button>
        </Bottom>
      </Info>
    </Card>
  );
}
