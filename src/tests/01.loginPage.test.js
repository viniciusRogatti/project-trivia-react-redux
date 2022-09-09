import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { BTN_PLAY_TEST_ID, BTN_SETTINGS_TEST_ID, INPUT_EMAIL_TEST_ID, INPUT_NAME_TEST_ID } from './helpers';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'


describe('Testando a pagina de Login', () => {
  test('Verifica se os inputs e os buttons são renderizados na tela', () => {
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId(INPUT_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(INPUT_EMAIL_TEST_ID);
    const BtnPlay = screen.getByTestId(BTN_PLAY_TEST_ID);
    const BtnSettings = screen.getByTestId(BTN_SETTINGS_TEST_ID);
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(BtnPlay).toBeInTheDocument();
    expect(BtnSettings).toBeInTheDocument();
  });
  test('Verifica se o botão "Play" inicia desabilitado e se é habilitado ao digitar um nome e um email', () => {
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId(INPUT_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(INPUT_EMAIL_TEST_ID);
    const BtnPlay = screen.getByTestId(BTN_PLAY_TEST_ID);
    expect(BtnPlay).toBeDisabled();
   
    userEvent.type(inputName, 'teste')
    userEvent.type(inputEmail, 'teste@gmail.com');

    expect(BtnPlay).not.toBeDisabled();

  });
  test('Verifica se ao clicar no botão "Play" o pathname muda para "/playpage"', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId(INPUT_NAME_TEST_ID);
    const inputEmail = screen.getByTestId(INPUT_EMAIL_TEST_ID);
    const BtnPlay = screen.getByTestId(BTN_PLAY_TEST_ID);  
    userEvent.type(inputName, 'teste')
    userEvent.type(inputEmail, 'teste@gmail.com');
    userEvent.click(BtnPlay);

    expect(await screen.findByRole('heading', { level: 2, name: /playpage/i}));
    expect(history.location.pathname).toBe("/playpage")

  });
  test('Verifica se ao clicar no botão "Settings" o pathname muda para "/settings"', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    userEvent.click(screen.getByTestId(BTN_SETTINGS_TEST_ID));
    expect(await screen.findByRole('heading', { level: 1, name: /settings/i}));
    expect(history.location.pathname).toBe("/settings")
  });
  // test('Verifica se ao clicar no botão "Play" o token é salvo no localStorage', async () => {
  // });
});