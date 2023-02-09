import styled from 'styled-components';

const ContainerQuestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  z-index: 2;

  .logoTrivia {
    top: -200px;
    position: absolute;
  }
  .icon-footer-game {
    bottom: -150px;
    position: absolute;
    width: 37px;
    height: 42px;
  }
`;

export default ContainerQuestion;
