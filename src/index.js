import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import GlobalStyles from './styles/globalStyle';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <GlobalStyles />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
