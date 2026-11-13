import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { colors, media } from '../theme';

const Announcement = styled.div`
  background: ${colors.dark};
  color: #fff;
  text-align: center;
  padding: 9px;
  font-size: 13px;
`;

const Header = styled.header`
  height: 78px;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 1px solid #e8ece9;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 20;

  ${media.tablet} {
    gap: 15px;
  }
`;

const Logo = styled(Link)<{ $light?: boolean }>`
  font: bold 24px 'Playfair Display';
  white-space: nowrap;
  ${(p) => p.$light && 'color: black;'}
`;

const LogoAccent = styled.span`
  color: #e9843e;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 8px;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: 0;

  ${media.tablet} {
    display: block;
    margin-left: auto;
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-left: auto;

  a {
    font-weight: 600;
    font-size: 14px;
  }

  a.active {
    color: #e36f2d;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;
    border: 1px solid #e36f2d;
  }

  ${media.tablet} {
    display: ${(p) => (p.$open ? 'grid' : 'none')};
    position: absolute;
    top: 78px;
    left: 0;
    right: 0;
    background: #fff;
    padding: 25px;
    box-shadow: 0 12px 20px #0001;
  }
`;

const SearchForm = styled.form`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f4f6f3;
  border-radius: 24px;
  padding: 10px 14px;
  min-width: 220px;

  input {
    border: 0;
    background: transparent;
    outline: 0;
    width: 100%;
  }

  ${media.tablet} {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
`;

const CartLink = styled(Link)`
  position: relative;

  b {
    position: absolute;
    right: -9px;
    top: -9px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #e9843e;
    color: white;
    font-size: 11px;
    display: grid;
    place-items: center;
  }
`;

const Footer = styled.footer`
  background: ${colors.dark};
  color: #dfece6;
  padding: 60px 7vw 30px;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 40px;

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;

  h4 {
    color: #fff;
  }
`;

const FooterNote = styled.small`
  grid-column: 1 / -1;
  border-top: 1px solid #ffffff26;
  padding-top: 25px;
  margin-top: 20px;
`;

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
      <Announcement>Don't miss our holiday offer - up to 50% OFF!</Announcement>

      {/* Header */}
      <Header>
        <Logo to="/">
          <LogoImg src={`${import.meta.env.BASE_URL}logo.png`} alt="Tahi Fresh" />
          <LogoAccent>Tahi</LogoAccent>Fresh
        </Logo>

        <MenuButton onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</MenuButton>

        <Nav $open={open}>
          {['Home', 'Shop', 'About', 'Contact', 'FAQ'].map((x) => (
            <NavLink
              key={x}
              onClick={() => setOpen(false)}
              to={x === 'Home' ? '/' : '/' + x.toLowerCase()}
            >
              {x}
            </NavLink>
          ))}
        </Nav>

        <SearchForm onSubmit={submit}>
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search groceries"
          />
        </SearchForm>

        <Actions>
          <Link to="/account" aria-label="Account">
            <User />
          </Link>
          <CartLink to="/cart" aria-label="Cart">
            <ShoppingBag />
            <b>{count}</b>
          </CartLink>
        </Actions>
      </Header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer>
        <FooterColumn>
          <Logo $light to="/">
            <LogoAccent>Fresh</LogoAccent>Basket
          </Logo>
          <p>Welcome to Tahi World</p>
        </FooterColumn>

        <FooterColumn>
          <h4>Shop</h4>
          <Link to="/shop">All products</Link>
          <Link to="/shop?category=Parfait">Parfait</Link>
          <Link to="/shop?category=Yogurt">Yogurt</Link>
          <Link to="/shop?category=Bundles">Bundles</Link>
          <Link to="/shop?category=Zobo">Zobo</Link>
          <Link to="/shop?category=Waffles">Waffles</Link>
          <Link to="/shop?category=Banana bread">Banana Bread</Link>
          <Link to="/shop?category=Pancake">Pancake</Link>
        </FooterColumn>

        <FooterColumn>
          <h4>Customer care</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping &amp; returns</Link>
        </FooterColumn>

        <FooterColumn>
          <h4>Legal</h4>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms of service</Link>
        </FooterColumn>

        <FooterNote>© 2026 Tahi Fresh. Original demonstration storefront.</FooterNote>
      </Footer>
    </>
  );
}
