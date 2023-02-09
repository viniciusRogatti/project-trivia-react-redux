import styled from 'styled-components';
import bgImg from '../_imgs/background.png';

const MainGame = styled.main`
  display: flex;
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default MainGame;
