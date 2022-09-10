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

  :focus&.wrongAnswer {
    background-color: red;
  }

  :focus&.correctAnswer {
    background-color: rgb(6, 240, 15);
  }
`;

export default ButtonAnswer;
