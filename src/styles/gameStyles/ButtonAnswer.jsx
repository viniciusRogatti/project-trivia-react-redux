import styled from 'styled-components';

const ButtonAnswer = styled.button`
  width: 515px;
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
`;

export default ButtonAnswer;
