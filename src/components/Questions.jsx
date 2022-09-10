import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoIosTimer } from 'react-icons/io';
import { connect } from 'react-redux';
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
import TimerComtent from '../styles/TimerStyle';
import { scoreAction } from '../redux/actions';

class Questions extends Component {
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

  componentDidUpdate(prevprops) {
    if (prevprops !== this.props) {
      this.getListQuestions();
    }
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

  sumScore = (answer) => {
    const { question: { correct_answer: correctAnswer, difficulty }, score } = this.props;
    const { timer } = this.state;
    if (answer === correctAnswer) {
      const dez = 10;
      const hard = 3;
      switch (difficulty) {
      case 'easy':
        return dez + (timer * 1);
      case 'medium':
        return dez + (timer * 2);
      case 'hard':
        return dez + (timer * hard);
      default:
        break;
      }
    } else return score;
  };

  handleClick = ({ target: { innerText } }) => {
    this.setState({ nextQuestion: true });
    const { dispatch } = this.props;
    dispatch(scoreAction(this.sumScore(innerText)));
  };

  render() {
    const {
      answerArray,
      category,
      questionText,
      answerCorrect,
      nextQuestion, timer } = this.state;

    const { handleNext } = this.props;

    return (
      <SectionGame>
        <ContainerQuestion>
          <LogoStyle className="logoTrivia" />
          <BoxQuestion>
            <BoxCategory data-testid="question-category">{category}</BoxCategory>
            <BoxTextQuestion data-testid="question-text">{questionText}</BoxTextQuestion>
            <TimerComtent>
              <IoIosTimer />
              <p>
                Tempo:
                {' '}
                {timer}
                s
              </p>
            </TimerComtent>
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
            <ButtonStyle
              data-testid="btn-next"
              onClick={ () => handleNext() }
            >
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
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Questions);
