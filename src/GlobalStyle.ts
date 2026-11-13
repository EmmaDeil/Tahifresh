import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'DM Sans', sans-serif;
    color: #173a2d;
    background: #fff;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    image-rendering: crisp-edges;
    background-image: url(${import.meta.env.BASE_URL}Gemini_Generated_Image_-4.png);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  input,
  textarea,
  select {
    border: 1px solid #cfd9d3;
    background: #fff;
    border-radius: 6px;
    padding: 12px;
    outline-color: ${colors.green};
  }
`;
