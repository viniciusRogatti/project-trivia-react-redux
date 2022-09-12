import styled from 'styled-components';

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 320px;
  width: 439px;
  height: 278px;
  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 1;

  h2 {
    font-family: 'Epilogue';
    font-weight: 700;
    font-size: 30px;
    text-transform: uppercase;
    margin: 20px;
  }

  .red {
    color: #EA5D5D;
  }

  .green {
    color: #00D5E2;
  }

  strong, span {
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: #B5B5B5;
  }

  strong:before {
    content: 'Você Acertou: '
  }

  strong:after {
    content: ' questões!'
  }


  span::before {
    content: 'Sua Pontuação foi: '
  }
`;

export default ContainerBox;
