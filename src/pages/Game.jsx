import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchTrivia from '../services/fetchTrivia';
import { getToken } from '../services/storage';
import Questions from '../components/Questions';
import MainGame from '../styles/gameStyles/MainGame';
import FooterGame from '../styles/gameStyles/FooterGame';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
  };

  async componentDidMount() {
    const data = await fetchTrivia(getToken());
    const invalidToken = 3;
    const validationToken = data.response_code === invalidToken;
    if (validationToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: data.results });
    }
  }

  handleNext = () => {
    const { indexQuestion, questions } = this.state;
    console.log(indexQuestion < questions.length);
    if (indexQuestion < questions.length - 1) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
      }));
    }
  };

  render() {
    const { questions, indexQuestion } = this.state;
    console.log(questions[indexQuestion]);
    return (
      <MainGame>
        <Header />
        { questions.length > 0 && (
          <Questions
            handleNext={ this.handleNext }
            question={ questions[indexQuestion] }
          />) }
        <FooterGame />
      </MainGame>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
