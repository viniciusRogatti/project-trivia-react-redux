import styled from 'styled-components';
import imgBackground from '../_imgs/background-ranking-page.png';

const MainRanking = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${imgBackground});
  background-size: cover;
`;

export default MainRanking;
