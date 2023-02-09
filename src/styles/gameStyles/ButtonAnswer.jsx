import styled from 'styled-components';

const ButtonAnswer = styled.button`
  width: 515px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  left: 661px;
  top: 361px;
  background: #FFFFFF;
  border-radius: 100px;
  font-family: 'Epilogue';
  font-style: normal;
  margin: 9px;
  cursor: pointer;



  :disabled&.correctAnswer {
    background-color: rgb(6, 240, 15);
    opacity: 0.5;
  }

  :disabled&.wrongAnswer {
    background-color: red;
    opacity: 0.5;
  }

  svg {
    width: 46px;
    height: 46px;
  }
`;

export default ButtonAnswer;
