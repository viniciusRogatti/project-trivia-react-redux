import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from '../styles/Button';

export default class Questions extends Component {
  state = {
    answerArray: [],
    // answerCorrect: '',
    category: '',
    questionText: '',
  };

  componentDidMount() {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers, category, question } } = this.props;
    const listQuestions = [...incorrectAnswers, correctAnswer];
    const answerArray = this.shuffleArray(listQuestions);
    console.log(answerArray);
    this.setState({
      answerArray,
      // answerCorrect: correctAnswer,
      category,
      questionText: question });
  }

  // Função para randomizar array
  shuffleArray = (arr) => {
  // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  };

  render() {
    const { answerArray, category, questionText } = this.state;

    return (
      <div>
        <span data-testid="question-category">{category}</span>
        <span data-testid="question-text">{questionText}</span>
        <div data-testid="answer-options">
          { answerArray?.map((answer, index) => (
            <ButtonStyle
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid={ `wrong-answer-${index}` }
            >
              { answer }
            </ButtonStyle>
          ))}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.shape(PropTypes.object.isRequired).isRequired,
};
