import styled from 'styled-components';

const ContentRanking = styled.div`
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
    position: absolute;
    z-index: 1;
    top: 40px;
  }

  h1 {
    position: relative;
    top: -20px;
    font-family: 'Epilogue';
    font-size: 30px;
    text-align: center;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3C1B7A;
  }

  ul {
    padding-left: 0;
    max-height: 200px;
    min-height: 200px;
    overflow-y: scroll;
  }

  ul::-webkit-scrollbar {
    width: 0;
  }

  ul::-webkit-scrollbar-thumb {
    width: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    height: 55px;
    min-width: 386px;
    margin-bottom: 13px;
    margin-right: 10px;
    margin-left: 10px;
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

  button {
    margin-top: 10px;
  }
`;

export default ContentRanking;
