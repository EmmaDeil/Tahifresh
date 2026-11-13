import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Button, Eyebrow, Field, FormCard, displayTitle } from '../components/ui';
import { colors, media } from '../theme';

const ContentPage = styled.section<{ $narrow?: boolean; $legal?: boolean }>`
  padding: 90px max(8vw, 20px);
  max-width: ${(p) => (p.$narrow ? '600px' : '1200px')};
  margin: auto;

  > p {
    font-size: 18px;
    line-height: 1.8;
    max-width: 850px;
  }

  h1 {
    ${displayTitle}
    font-size: 58px;

    ${media.mobile} {
      font-size: 44px;
    }
  }

  ${(p) =>
    p.$legal &&
    css`
      h2 {
        margin-top: 35px;
      }
    `}
`;

const gridBase = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 40px;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const ContentGrid = styled.div`
  ${gridBase}

  article {
    background: ${colors.cream};
    padding: 28px;
    border-radius: 12px;
  }
`;

const ContactGrid = styled.div`
  ${gridBase}
  grid-template-columns: 1.2fr 0.8fr;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Faq = styled.article`
  border-bottom: 1px solid #dce3df;

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 22px 0;
    border: 0;
    background: none;
    text-align: left;
  }

  p {
    padding-bottom: 18px;
    color: #56665f;
  }
`;

// ─── About ───────────────────────────────────────────────────────────────────

export function About() {
  return (
    <ContentPage>
      <Eyebrow>Our story</Eyebrow>
      <h1>Freshness, convenience and dependable service.</h1>
      <p>
        FreshBasket is an original demonstration grocery storefront designed around fast product
        discovery, clear information and a straightforward checkout experience.
      </p>

      <ContentGrid>
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
      </ContentGrid>
    </ContentPage>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function Contact() {
  return (
    <ContentPage>
      <Eyebrow>We are here to help</Eyebrow>
      <h1>Contact us</h1>

      <ContactGrid>
        <FormCard onSubmit={(e) => e.preventDefault()}>
          <Field>
            Name
            <input required />
          </Field>
          <Field>
            Email
            <input type="email" required />
          </Field>
          <Field>
            Subject
            <input required />
          </Field>
          <Field>
            Message
            <textarea rows={6} required />
          </Field>
          <Button>Send message</Button>
        </FormCard>

        <aside>
          <h2>Customer support</h2>
          <p>Email: thahiworld@gmail.com</p>
          <p>Phone: +2348124941707</p>
          <p>Ikeja, Lagos, Nigeria</p>
        </aside>
      </ContactGrid>
    </ContentPage>
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
    <ContentPage>
      <Eyebrow>Helpful answers</Eyebrow>
      <h1>Frequently asked questions</h1>

      {FAQ_ITEMS.map(({ q, a }, i) => (
        <Faq key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)}>
            <b>{q}</b>
            <span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p>{a}</p>}
        </Faq>
      ))}
    </ContentPage>
  );
}

// ─── Account ─────────────────────────────────────────────────────────────────

export function Account() {
  return (
    <ContentPage $narrow>
      <Eyebrow>Customer account</Eyebrow>
      <h1>Welcome back</h1>

      <FormCard onSubmit={(e) => e.preventDefault()}>
        <Field>
          Email
          <input type="email" required />
        </Field>
        <Field>
          Password
          <input type="password" required />
        </Field>
        <Button $wide>Log in</Button>
        <p>
          New customer? <Link to="/register">Create an account</Link>
        </p>
      </FormCard>
    </ContentPage>
  );
}

// ─── Register ────────────────────────────────────────────────────────────────

export function Register() {
  return (
    <ContentPage $narrow>
      <Eyebrow>Join us</Eyebrow>
      <h1>Create your account</h1>

      <FormCard onSubmit={(e) => e.preventDefault()}>
        <Field>
          Full name
          <input required />
        </Field>
        <Field>
          Email
          <input type="email" required />
        </Field>
        <Field>
          Password
          <input type="password" minLength={8} required />
        </Field>
        <Button $wide>Create account</Button>
      </FormCard>
    </ContentPage>
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
    <ContentPage $legal>
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
    </ContentPage>
  );
}
