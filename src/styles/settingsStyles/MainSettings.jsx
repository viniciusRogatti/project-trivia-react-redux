import styled from 'styled-components';

const MainSettings = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 489px;
  height: 488px;
  left: 396px;
  top: 148px;
  background: #FFFFFF;
  box-shadow: 1px 4px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  h1 {
  width: 352px;
  height: 45px;
  margin-top: 143px;

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  /* identical to box height, or 45px */

  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: #3C1B7A;
  }

  button {
    width: 386px;
  }
`;

export default MainSettings;
