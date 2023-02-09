import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { ANSWER_OPTIONS_TEST_ID, CORRECT_ANSWER_TEST_ID, HEADER_NAME_TEST_ID, HEADER_PICTURE_TEST_ID, HEADER_SCORE_TEST_ID, INPUT_NAME_TEST_ID, QUESTION_CATEGORY_TEST_ID, QUESTION_TEXT_TEST_ID } from './helpers';
import { invalidTokenQuestionsResponse, questionsResponse } from './helpers/mockQuestions';
import { INITIAL_STATE } from './helpers/mockState';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando a pagina Game', () => {
  test('Verifica se o header é renderizado na pagina de Game e se o score é iniciado zerado', () => {
    renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const nameUser = screen.getByTestId(HEADER_NAME_TEST_ID);
    const nameScore = screen.getByTestId(HEADER_SCORE_TEST_ID);
    const namePicture = screen.getByTestId(HEADER_PICTURE_TEST_ID);

    expect(nameUser).toBeInTheDocument();
    expect(nameScore).toBeInTheDocument();
    expect(namePicture).toBeInTheDocument();
  });

  test('Verifica se as pergunta e as respostas são renderizadas, e se as respostas são botões', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const { results } = questionsResponse;
    const incorrectAnswers  = results[0].incorrect_answers;
    const correctAnswer =  results[0].correct_answer;
    const listQuestions = [...incorrectAnswers, correctAnswer];

    const categoryQuestion = await screen.findByTestId(QUESTION_CATEGORY_TEST_ID);
    const textQuestion = await screen.findByTestId(QUESTION_TEXT_TEST_ID);
    const containerAnswers = await screen.findByTestId(ANSWER_OPTIONS_TEST_ID);

    listQuestions.forEach((question) => {
      expect(screen.getByRole('button', { name: question } )).toBeInTheDocument();
    })

    expect(categoryQuestion).toHaveTextContent(results[0].category)
    expect(textQuestion).toHaveTextContent(results[0].question)
    expect(containerAnswers).toBeInTheDocument();

  });

  test('Verifica se ao clicar em uma resposta os botões de resposta são desabilitados e é possível clicar no botão "Next"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');

    const { results } = questionsResponse;
    const incorrectAnswer =  results[0].incorrect_answers;
    const btnAnswer = await screen.findByRole('button', { name: incorrectAnswer[0] } )

    userEvent.click(btnAnswer)
    const btnNext = await screen.findByRole('button', { name: /next/i } )
  
    expect(btnAnswer).toBeDisabled();
    expect(btnNext).toBeInTheDocument();

  });

  test('Verifica se ao clicar no botão "next" é renderizada outra pergunta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const { results } = questionsResponse;

    // selecionando a resposta correta da primeira pergunta
    const correctAnswer =  results[0].correct_answer;
    const btnAnswer = await screen.findByRole('button', { name: correctAnswer } )

    // clicando no botão da resposta correta da primeira pergunta
    userEvent.click(btnAnswer)

    // clicando no botão "next"
    const btnNext = await screen.findByRole('button', { name: /next/i } )  
    userEvent.click(btnNext)

    // juntando a resposta correta da segunda pergunta com as incorretas tudo em um array
    const nextCorrectAnswer =  results[1].correct_answer;
    const nextIncorrectAnswers  = results[1].incorrect_answers;
    const listQuestions = [...nextIncorrectAnswers, nextCorrectAnswer];

    // selecionando os elementos que exibem a categoria e texto da segunda pergunta
    const categoryQuestion = await screen.findByTestId(QUESTION_CATEGORY_TEST_ID);
    const textQuestion = await screen.findByTestId(QUESTION_TEXT_TEST_ID);

    // verificando se todas as respostas estão na tela e se são botões
    listQuestions.forEach((question) => {
      expect(screen.getByRole('button', { name: question } )).toBeInTheDocument();
    })

    // verificando se as informações da segunda pergunta são exibidas corretamente
    expect(categoryQuestion).toHaveTextContent(results[1].category)
    expect(textQuestion).toHaveTextContent(results[1].question)
  });

  test('Verifica se ao acertar uma resposta o score é somado corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    const { store } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');

    const categoryQuestion = await screen.findByTestId(QUESTION_CATEGORY_TEST_ID);
    

    expect(categoryQuestion).toBeInTheDocument();
    const btnAnswerCorrect = screen.getByTestId(CORRECT_ANSWER_TEST_ID)

    userEvent.click(btnAnswerCorrect);
    console.log(btnAnswerCorrect.textContent);
    expect(btnAnswerCorrect).toBeDisabled();

    const textQuestion = await screen.findByTestId(QUESTION_TEXT_TEST_ID);
    expect(textQuestion).toBeInTheDocument();
    console.log(store.getState().player);
  })

  test('Verifica se ao chegar na ultima pergunta e clicar no botão "next" o usuário é redirecionado para a tela de feedback ', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const { results } = questionsResponse;

    const categoryQuestion = await screen.findByTestId(QUESTION_CATEGORY_TEST_ID);
    const textQuestion = await screen.findByTestId(QUESTION_TEXT_TEST_ID);

    expect(categoryQuestion).toBeInTheDocument();
    expect(textQuestion).toBeInTheDocument();

    results.forEach(({correct_answer}) => {
      userEvent.click(screen.getByRole('button', { name: correct_answer } ));
      userEvent.click(screen.getByRole('button', { name: /next/i } ));
    })

    expect(history.location.pathname).toBe('/feedback');
  })

  test('Verifica se o usuário é deslogado caso o token seja invalido', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const inputName = await screen.findByTestId(INPUT_NAME_TEST_ID);
    expect(inputName).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  jest.setTimeout(33000)
  test('', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/playpage');
    const { results } = questionsResponse;
    

    await new Promise((interval) => setTimeout(interval, 32000));
    expect(screen.getByTestId('correct-answer')).toBeDisabled()
  })
});