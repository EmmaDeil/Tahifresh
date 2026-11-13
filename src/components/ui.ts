import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { colors, media } from '../theme';

export const displayTitle = css`
  font: 700 clamp(42px, 6vw, 78px) / 1.03 'Playfair Display';
  margin: 14px 0 20px;
`;

export const Eyebrow = styled.span`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  font-weight: 700;
  color: #dd6d2d;
`;

const buttonStyles = css<{ $variant?: 'primary' | 'secondary'; $wide?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  padding: 14px 22px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  ${(p) => p.$wide && 'width: 100%;'}
  ${(p) =>
    p.$variant === 'secondary'
      ? css`
          border: 1px solid ${colors.green};
          color: ${colors.green};
        `
      : css`
          background: ${colors.green};
          color: #fff;
        `}
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary'; $wide?: boolean }>`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)<{ $variant?: 'primary' | 'secondary'; $wide?: boolean }>`
  ${buttonStyles}
`;

export const Section = styled.section<{ $muted?: boolean }>`
  padding: 85px 7vw;
  ${(p) => p.$muted && `background: ${colors.cream};`}

  ${media.mobile} {
    padding: 60px 20px;
  }
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
  font: 700 40px 'Playfair Display';
  margin: 8px 0;
`;

export const SectionLink = styled(Link)`
  display: flex;
  gap: 6px;
  color: ${colors.green};
  font-weight: 700;
`;

export const PageTitle = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    ${displayTitle}
    font-size: 56px;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Empty = styled.section`
  text-align: center;
  padding: 120px 20px;

  > span {
    font-size: 80px;
  }
`;

export const twoColumnLayout = css`
  display: grid;
  grid-template-columns: 1.6fr 0.8fr;
  gap: 40px;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const Qty = styled.div<{ $small?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => (p.$small ? '10px' : '18px')};
  margin: ${(p) => (p.$small ? '0' : '25px 0')};

  button {
    width: ${(p) => (p.$small ? '32px' : '42px')};
    height: ${(p) => (p.$small ? '32px' : '42px')};
    border: 1px solid #d7ddd9;
    background: #fff;
    border-radius: 6px;
    display: grid;
    place-items: center;
  }

  svg {
    width: 16px;
  }
`;

export const Summary = styled.aside`
  background: ${colors.cream};
  border-radius: 12px;
  padding: 28px;
  height: max-content;

  p {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  small {
    display: block;
    margin-top: 15px;
    color: #64726c;
  }
`;

export const SummaryTotal = styled.p`
  font-size: 20px;
`;

const formCardStyles = css`
  background: ${colors.cream};
  border-radius: 12px;
  padding: 28px;
  height: max-content;
  display: grid;
  gap: 18px;

  h2 {
    margin-bottom: 0;
  }
`;

export const FormCard = styled.form`
  ${formCardStyles}
`;

export const FormCardBox = styled.div`
  ${formCardStyles}
`;
export const Field = styled.label<{ $full?: boolean }>`
  display: grid;
  gap: 7px;
  font-weight: 600;
  ${(p) => p.$full && 'grid-column: 1 / -1;'}

  ${media.mobile} {
    ${(p) => p.$full && 'grid-column: auto;'}
  }
`;

export const RadioField = styled(Field)`
  display: flex !important;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;
