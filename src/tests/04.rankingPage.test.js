import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FIRST_STATE } from './helpers/mockState';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { RANKING_BTN_HOME } from "./helpers";

describe('Testando a pagina de Ranking', () => {
  test('', () => {
    const { history } = renderWithRouterAndRedux(<App/>, FIRST_STATE, '/ranking');
    const btnHome = screen.getByTestId(RANKING_BTN_HOME);
    userEvent.click(btnHome);

    expect(history.location.pathname).toBe('/');
  });
});

