import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
