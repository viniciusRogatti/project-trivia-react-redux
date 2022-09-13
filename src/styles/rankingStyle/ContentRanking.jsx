import styled from 'styled-components';

const ContentRanking = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 489px;
  height: 468px;
  border-radius: 10px;
  background-color: #FFFFFF;
  color: black;

  .logo-ranking {
    width: 177.79px;
    height: 190px;
    
  }

  h1 {
    width: 352px;
    height: 45px;
    left: 464px;
    top: 272px;
    font-family: 'Epilogue';
    font-style: normal;
    font-size: 30px;
    text-align: center;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3C1B7A;
  }

  ul {
    padding-left: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    height: 55px;
    min-width: 386px;
    left: 447px;
    top: 336px;
    margin-bottom: 13px;
    border-radius: 100px;
    background: #EBEBEB;
  }

  img {
    height: 37px;
    width: 37px;
    left: 457px;
    top: 344px;
    margin-left: 10px;
    margin-right: 13px;
    border-radius: 18.1373px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ContentRanking;
