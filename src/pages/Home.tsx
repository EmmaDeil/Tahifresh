import { ArrowRight, CalendarCheck, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  ButtonLink,
  Eyebrow,
  ProductGrid,
  Section,
  SectionHead,
  SectionLink,
  SectionTitle,
  displayTitle,
} from '../components/ui';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import { colors, media } from '../theme';

const orbit = keyframes`
  from {
    transform: rotate(var(--a)) translateX(var(--orbit-radius)) rotate(calc(var(--a) * -1));
  }

  to {
    transform: rotate(calc(var(--a) + 360deg)) translateX(var(--orbit-radius))
      rotate(calc(var(--a) * -1 - 360deg));
  }
`;

const scrollTicker = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
`;

const Hero = styled.section`
  min-height: 590px;
  background: linear-gradient(120deg, #eef4dd, #f8f4e7);
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  padding: 70px 8vw;
  gap: 60px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    padding-top: 50px;
  }

  ${media.mobile} {
    min-height: 500px;
  }
`;

const HeroTitle = styled.h1`
  ${displayTitle}

  ${media.mobile} {
    font-size: 46px;
  }
`;

const HeroText = styled.p`
  font-size: 19px;
  line-height: 1.7;
  max-width: 600px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`;

const HeroVisual = styled.div`
  --orbit-radius: 250px;
  --orbit-size: 96px;
  height: 420px;
  border-radius: 50% 50% 44% 56%;
  background: #cfe5a0;
  position: relative;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 18px #e9f2cf;

  ${media.tablet} {
    height: 340px;
    --orbit-radius: 115px;
    --orbit-size: 80px;
  }

  ${media.mobile} {
    display: none;
  }

  strong {
    background: #fff;
    padding: 16px 22px;
    border-radius: 40px;
    z-index: 2;
  }
`;

const OrbitItem = styled.span<{ $angle: number }>`
  --a: ${(p) => p.$angle}deg;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--orbit-size);
  height: var(--orbit-size);
  margin: calc(var(--orbit-size) / -2) 0 0 calc(var(--orbit-size) / -2);
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 8px 20px #173a2d33;
  animation: ${orbit} 18s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(var(--a)) translateX(var(--orbit-radius)) rotate(calc(var(--a) * -1));
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Features = styled.section`
  margin: -32px auto 0;
  position: relative;
  width: min(1100px, 90%);
  background: #fff;
  box-shadow: 0 15px 50px #173a2d1a;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 25px 30px;
  border-radius: 12px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 25px;
  border-right: 1px solid #ddd;

  ${media.tablet} {
    border-right: 0;
    border-bottom: 1px solid #ddd;
  }

  &:last-child {
    border: 0;
  }

  svg {
    color: #e9843e;
  }

  span {
    display: grid;
  }

  small {
    color: #66756f;
    margin-top: 4px;
  }
`;

const TickerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: #f8a824;
  padding: 12px 0;
  box-sizing: border-box;
`;

const TickerTrack = styled.div`
  display: inline-block;
  animation: ${scrollTicker} 20s linear infinite;
`;

const TickerItem = styled.span`
  display: inline-block;
  padding-right: 40px;
  font-family: sans-serif;
  font-weight: 800;
  color: #3f190d;
  text-transform: uppercase;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;

  ${media.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryLink = styled(Link)`
  text-align: center;
  background: ${colors.cream};
  border-radius: 12px;
  padding: 25px 10px;
  transition: 0.2s;

  &:hover {
    transform: translateY(-4px);
    background: #eef3db;
  }

  span {
    display: block;
    font-size: 48px;
    margin-bottom: 10px;
  }
`;

const Promo = styled.section`
  margin: 70px 7vw;
  min-height: 330px;
  border-radius: 18px;
  background: #dbeaa7;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  align-items: center;
  padding: 55px 7vw;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }

  ${media.mobile} {
    margin: 40px 20px;
    padding: 40px 25px;
  }
`;

const PromoArt = styled.div`
  font-size: 140px;
  text-align: center;

  ${media.mobile} {
    font-size: 90px;
  }
`;

const base = import.meta.env.BASE_URL;
const heroImages = [
  { src: 'b1.png', alt: 'Banana bread' },
  { src: 'j1.jpg', alt: 'Fresh juice' },
  { src: 'w1.jpg', alt: 'Waffle box' },
  { src: 'z1.png', alt: 'Zobo' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero>
        <div>
          <Eyebrow>Tahi-fresh convenience</Eyebrow>
          <HeroTitle>Crave it,</HeroTitle>
          <HeroTitle>Click it</HeroTitle>
          <HeroText>
            Shop produce, pantry staples, proteins and curated bundles from one convenient
            storefront.
          </HeroText>
          <HeroButtons>
            <ButtonLink to="/shop">
              Shop now <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink $variant="secondary" to="/about">
              Our story
            </ButtonLink>
          </HeroButtons>
        </div>

        <HeroVisual>
          {heroImages.map((img, i) => (
            <OrbitItem key={img.src} $angle={i * 90}>
              <img src={base + img.src} alt={img.alt} />
            </OrbitItem>
          ))}
          <strong>Freshness in every bite</strong>
        </HeroVisual>
      </Hero>

      {/* Features strip */}
      <Features>
        <Feature>
          <Truck />
          <span>
            <b>Convenient delivery</b>
            <small>Doorstep service in supported areas</small>
          </span>
        </Feature>
        <Feature>
          <ShieldCheck />
          <span>
            <b>Quality selected</b>
            <small>Products checked before dispatch</small>
          </span>
        </Feature>
        <Feature>
          <CalendarCheck />
          <span>
            <b>Easy ordering</b>
            <small>Shop whenever it suits you</small>
          </span>
        </Feature>
      </Features>

      {/* Ticker */}
      <TickerContainer>
        <TickerTrack>
          {/* Content is duplicated to ensure a seamless infinite scroll */}
          <TickerItem>🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</TickerItem>
          <TickerItem>🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</TickerItem>
          <TickerItem>🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</TickerItem>
          <TickerItem>🍃 STEP INTO TAHI WORLD 😊 TASTE HAPPINESS</TickerItem>
        </TickerTrack>
      </TickerContainer>

      {/* Categories */}
      <Section>
        <SectionHead>
          <div>
            <Eyebrow>Browse easily</Eyebrow>
            <SectionTitle>Shop by category</SectionTitle>
          </div>
          <SectionLink to="/shop">
            View all <ArrowRight size={18} />
          </SectionLink>
        </SectionHead>

        <Categories>
          {categories.map((c, i) => (
            <CategoryLink to={'/shop?category=' + encodeURIComponent(c)} key={c}>
              <span>{['🥬', '🍓', '🫘', '🥛', '🍗', '🐟', '📦'][i]}</span>
              <b>{c}</b>
            </CategoryLink>
          ))}
        </Categories>
      </Section>

      {/* Featured products */}
      <Section $muted>
        <SectionHead>
          <div>
            <Eyebrow>Customer favourites</Eyebrow>
            <SectionTitle>Featured products</SectionTitle>
          </div>
          <SectionLink to="/shop">
            Shop all <ArrowRight size={18} />
          </SectionLink>
        </SectionHead>

        <ProductGrid>
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard p={p} key={p.id} />
            ))}
        </ProductGrid>
      </Section>

      {/* Promo banner */}
      <Promo>
        <div>
          <Eyebrow>Weekly essentials</Eyebrow>
          <SectionTitle>Build a basket that works for your home.</SectionTitle>
          <p>Mix fresh produce, pantry goods and protein in one order.</p>
          <ButtonLink to="/shop">Start shopping</ButtonLink>
        </div>
        <PromoArt>🛒</PromoArt>
      </Promo>
    </>
  );
}
