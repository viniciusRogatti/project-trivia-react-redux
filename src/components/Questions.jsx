import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonAnswer from '../styles/gameStyles/ButtonAnswer';
import ContainerAnswer from '../styles/gameStyles/ContainerAnswer';
import SectionGame from '../styles/gameStyles/SectionGame';
import ContainerQuestion from '../styles/gameStyles/ContainerQuestion';
import LogoStyle from '../styles/LogoStyle';
import BoxQuestion from '../styles/gameStyles/BoxQuestion';
import BoxCategory from '../styles/gameStyles/BoxCategory';
import BoxTextQuestion from '../styles/gameStyles/BoxTextQuestion';
import IconTrybe from '../styles/IconTrybe';
import ButtonStyle from '../styles/ButtonStyle';

export default class Questions extends Component {
  state = {
    answerArray: [],
    answerCorrect: '',
    category: '',
    questionText: '',
    timer: 30,
    nextQuestion: false,
  };

  componentDidMount() {
    this.getListQuestions();
    this.timeToAnswer();
  }

  componentWillUnmount() {
    clearInterval(this.timeToAnswer());
  }

  timeToAnswer = () => {
    const oneSecond = 1000;
    return setInterval(() => {
      const { timer } = this.state;
      const timeLimit = 0;
      if (timer === timeLimit) {
        console.log('tempo esgotado');
        this.setState({ nextQuestion: true });
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }
    }, oneSecond);
  };

  getListQuestions = () => {
    const { question:
      { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers, category, question } } = this.props;
    const listQuestions = [...incorrectAnswers, correctAnswer];
    const answerArray = this.shuffleArray(listQuestions);
    this.setState(
      { answerArray, answerCorrect: correctAnswer, category, questionText: question },
    );
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  handleClick = () => {
    this.setState({ nextQuestion: true });
  };

  render() {
    const {
      answerArray,
      category,
      questionText,
      answerCorrect,
      nextQuestion, timer } = this.state;

    return (
      <SectionGame>
        <ContainerQuestion>
          <LogoStyle className="logoTrivia" />
          <BoxQuestion>
            <BoxCategory data-testid="question-category">{category}</BoxCategory>
            <BoxTextQuestion data-testid="question-text">{questionText}</BoxTextQuestion>
            <span>{timer}</span>
          </BoxQuestion>
          <IconTrybe />
        </ContainerQuestion>
        <ContainerAnswer data-testid="answer-options">
          { answerArray?.map((answer, index) => (answer === answerCorrect ? (
            <ButtonAnswer
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid="correct-answer"
              onClick={ this.handleClick }
              className={ nextQuestion && 'correctAnswer' }
              disabled={ nextQuestion }
            >
              { answer }
            </ButtonAnswer>
          ) : (
            <ButtonAnswer
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClick }
              className={ nextQuestion && 'wrongAnswer' }
              disabled={ nextQuestion }
            >
              { answer }
            </ButtonAnswer>
          )))}
          { nextQuestion && (
            <ButtonStyle>
              Next
            </ButtonStyle>
          )}
        </ContainerAnswer>
      </SectionGame>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.shape(PropTypes.object.isRequired).isRequired,
};
