import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── About ───────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section className="content-page">
      <span className="eyebrow">Our story</span>
      <h1>Freshness, convenience and dependable service.</h1>
      <p>
        FreshBasket is an original demonstration grocery storefront designed around fast product
        discovery, clear information and a straightforward checkout experience.
      </p>

      <div className="content-grid">
        <article>
          <h2>Carefully selected</h2>
          <p>
            Products are presented with practical units, transparent pricing and useful
            descriptions.
          </p>
        </article>
        <article>
          <h2>Built for convenience</h2>
          <p>
            Customers can browse categories, search, manage their basket and complete checkout
            from any device.
          </p>
        </article>
        <article>
          <h2>Ready to grow</h2>
          <p>
            The application structure can connect to inventory, payment, delivery and
            customer-management APIs.
          </p>
        </article>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section className="content-page">
      <span className="eyebrow">We are here to help</span>
      <h1>Contact us</h1>

      <div className="contact-grid">
        <form className="form-card" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Subject
            <input required />
          </label>
          <label>
            Message
            <textarea rows={6} required />
          </label>
          <button className="btn primary">Send message</button>
        </form>

        <aside>
          <h2>Customer support</h2>
          <p>Email: hello@example.com</p>
          <p>Phone: +234 000 000 0000</p>
          <p>Lagos, Nigeria</p>
          <p>Replace these placeholders with the business's verified contact details.</p>
        </aside>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'How does delivery work?',
    a: 'Delivery fees and available locations should be calculated from your delivery service rules at checkout.',
  },
  {
    q: 'Can I change my order?',
    a: 'Contact support as soon as possible. Changes depend on whether fulfilment has started.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'The starter supports online payment and transfer options. Connect your chosen payment gateway for live transactions.',
  },
  {
    q: 'How are substitutions handled?',
    a: 'Define a clear substitution policy and request customer approval before replacing unavailable products.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="content-page">
      <span className="eyebrow">Helpful answers</span>
      <h1>Frequently asked questions</h1>

      {FAQ_ITEMS.map(({ q, a }, i) => (
        <article className="faq" key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)}>
            <b>{q}</b>
            <span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p>{a}</p>}
        </article>
      ))}
    </section>
  );
}

// ─── Account ─────────────────────────────────────────────────────────────────

export function Account() {
  return (
    <section className="content-page narrow">
      <span className="eyebrow">Customer account</span>
      <h1>Welcome back</h1>

      <form className="form-card" onSubmit={(e) => e.preventDefault()}>
        <label>
          Email
          <input type="email" required />
        </label>
        <label>
          Password
          <input type="password" required />
        </label>
        <button className="btn primary wide">Log in</button>
        <p>
          New customer? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
}

// ─── Register ────────────────────────────────────────────────────────────────

export function Register() {
  return (
    <section className="content-page narrow">
      <span className="eyebrow">Join us</span>
      <h1>Create your account</h1>

      <form className="form-card" onSubmit={(e) => e.preventDefault()}>
        <label>
          Full name
          <input required />
        </label>
        <label>
          Email
          <input type="email" required />
        </label>
        <label>
          Password
          <input type="password" minLength={8} required />
        </label>
        <button className="btn primary wide">Create account</button>
      </form>
    </section>
  );
}

// ─── Policy ──────────────────────────────────────────────────────────────────

export function Policy({ type }: { type: 'privacy' | 'terms' | 'shipping' }) {
  const title =
    type === 'privacy'
      ? 'Privacy policy'
      : type === 'terms'
      ? 'Terms of service'
      : 'Shipping & returns';

  return (
    <section className="content-page legal">
      <h1>{title}</h1>
      <p>Last updated: 29 September 2026</p>

      <h2>Purpose</h2>
      <p>
        This is placeholder legal content for a demonstration storefront. It must be reviewed and
        replaced with business-specific terms before launch.
      </p>

      <h2>Customer information</h2>
      <p>
        Explain what data is collected, how it is used, how orders are processed and how customers
        may contact the business.
      </p>

      <h2>Orders and fulfilment</h2>
      <p>
        State applicable delivery areas, fees, timelines, substitutions, cancellations, returns and
        refund conditions clearly.
      </p>
    </section>
  );
}
