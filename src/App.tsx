import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Empty } from './components/ui';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { About, Account, Contact, FAQ, Policy, Register } from './pages/ContentPages';
import { AuthProvider } from './context/AuthContext';
import { TranslationProvider } from './context/TranslationContext';


export default function App() {
  return (
    <AuthProvider>
      <TranslationProvider>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Policy type="privacy" />} />
          <Route path="/terms" element={<Policy type="terms" />} />
          <Route path="/shipping" element={<Policy type="shipping" />} />
          <Route
            path="*"
            element={
              <Empty>
                <h1>Page not found</h1>
              </Empty>
            }
          />
        </Routes>
        </Layout>
      </TranslationProvider>
    </AuthProvider>
  );
}
