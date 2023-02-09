import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FEEDBACK_ASSERTIONS_TEST_ID, FEEDBACK_SCORE_TEST_ID, FEEDBACK_TEXT_TEST_ID, HEADER_NAME_TEST_ID, HEADER_SCORE_TEST_ID } from './helpers';
import { FIRST_STATE, SECOND_STATE } from './helpers/mockState';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando a pagina de feedback', () => {
  test('Verifica se o Header é renderizado na pagina de feedback', () => {
    renderWithRouterAndRedux(<App/>, FIRST_STATE, '/feedback');
    const nameUser = screen.getByTestId(HEADER_NAME_TEST_ID);
    const scoreUser = screen.getByTestId(HEADER_SCORE_TEST_ID);
    
    expect(nameUser).toBeInTheDocument();
    expect(scoreUser).toBeInTheDocument();  
  });

  test('Verifica se é renderizada uma mensagem relacionada ao desempenho da pessoa que jogou', () => {
    renderWithRouterAndRedux(<App/>, FIRST_STATE, '/feedback');
    const feedbackText = screen.getAllByTestId(FEEDBACK_TEXT_TEST_ID);
    expect(feedbackText[1]).toHaveTextContent('Could be better...');
  });

  test('Verifica se a mensagem de feedback é alterada de acordo com o desempenho do jogador e se a quantidade de acertos e o score são exibidos', () => {
    renderWithRouterAndRedux(<App/>, SECOND_STATE, '/feedback');
    const feedbackText = screen.getAllByTestId(FEEDBACK_TEXT_TEST_ID);
    const feedbackScore = screen.getAllByTestId(FEEDBACK_SCORE_TEST_ID);
    const feedbackAssertions = screen.getAllByTestId(FEEDBACK_ASSERTIONS_TEST_ID);
    expect(feedbackText[1]).toHaveTextContent('Well Done!');
    expect(feedbackScore[0]).toHaveTextContent('315');
    expect(feedbackAssertions[0]).toHaveTextContent('5');  
  });

  test('Verifica se os botões "Play Again" e "Ranking" são renderizados', () => {
    renderWithRouterAndRedux(<App/>, SECOND_STATE, '/feedback');
    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again' });
    const btnRanking = screen.getByRole('button', { name: 'Ranking' });
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão "Play Again" o jogador é redirecionado para a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App/>, SECOND_STATE, '/feedback');
    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again' });
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se ao clicar no botão "Ranking" o jogador é redirecionado para a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App/>, SECOND_STATE, '/feedback');
    const btnRanking = screen.getByRole('button', { name: 'Ranking' });
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });
});