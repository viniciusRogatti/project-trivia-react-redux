import styled from 'styled-components';
import logoTrivia from './_imgs/logo-trivia.png';

const LogoStyle = styled.div` 
  position: absolute;
  z-index: 1;
  top: 44px;
  width: 242px;
  height: 259.07px;
  background-image: url(${logoTrivia});
  background-size: cover;
  background-repeat: no-repeat;
`;

export default LogoStyle;
