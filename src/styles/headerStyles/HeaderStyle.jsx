import styled from 'styled-components';

const HeaderStyle = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 136px;
  height: 113px;
  background: #FFFFFF;
  color: #121212;

  img {
    width: 40px;
    height: 40px;
    border-radius: 18px;
    margin-right: 10px;
  }

  span {
    padding-right: 65px;
    font-family: 'Epilogue';
    font-weight: 400;
    font-size: 22px;
    letter-spacing: 0.08em;
  }

  strong {
    font-size: 24px;
    margin: 5px;
  }


  svg {
    width: 35px;
    height: 35px;
    color: #2FC18C;
    cursor: pointer;
  }

  svg.star-icon {
    color: #F9BA18;
    margin-right: 10px;
  }

  button {
    background: transparent;
  }
`;

export default HeaderStyle;
