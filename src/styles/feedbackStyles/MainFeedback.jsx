import styled from 'styled-components';
import imgBackground from '../_imgs/backgroundFeedback.png';

const MainFeedback = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${imgBackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .logo-feedback {
    width: 136.54px;
    height: 145px;
  }

`;

export default MainFeedback;
