import styled from 'styled-components';
import bgTrivia from '../_imgs/background.png';

export const BoxLoginStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px 48px;
  gap: 10px;
  width: 614px;
  height: 266px;
  top: 316px;
  background: #ffffff;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  input {
    width: 100%;
    padding: 12px 16px;
    font-family: "Verdana";
    font-weight: 500;
    font-size: 16px;
    color: #6B7588;
    border: 1px solid #E1E5EB;

    :focus {
      outline: 1px solid #2FC18C;
      font-size: 18px;
      background-color: rgb(230, 231, 231);
      color: #121212;
    }
  }
`;
export const BgStyle = styled.div`
  position: absolute;
  background-image: url(${bgTrivia});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  mix-blend-mode: multiply;
  filter: blur(2px);
`;
