import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonAnswer from '../styles/gameStyles/ButtonAnswer';
import ContainerAnswer from '../styles/gameStyles/ContainerAnswer';

export default class Questions extends Component {
  state = {
    answerArray: [],
    answerCorrect: '',
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
      answerCorrect: correctAnswer,
      category,
      questionText: question });
  }

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  handleClick = ({ target: { innerText } }) => {
    const { answerCorrect } = this.state;
    console.log(answerCorrect, innerText);
    if (innerText === answerCorrect) {
      console.log('entrou');
    }
  };

  render() {
    const { answerArray, category, questionText, answerCorrect } = this.state;

    return (
      <div>
        <span data-testid="question-category">{category}</span>
        <span data-testid="question-text">{questionText}</span>
        <ContainerAnswer data-testid="answer-options">
          { answerArray?.map((answer, index) => (answer === answerCorrect ? (
            <ButtonAnswer
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid="correct-answer"
              onClick={ this.handleClick }
            >
              { answer }
            </ButtonAnswer>
          ) : (
            <ButtonAnswer
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
            >
              { answer }
            </ButtonAnswer>
          )))}
        </ContainerAnswer>

      </div>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.shape(PropTypes.object.isRequired).isRequired,
};
