import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchTrivia from '../services/fetchTrivia';
import Questions from '../components/Questions';
import MainGame from '../styles/gameStyles/MainGame';
import FooterGame from '../styles/gameStyles/FooterGame';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
  };

  async componentDidMount() {
    const { url } = this.props;
    const data = await fetchTrivia(url);
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
    const { history } = this.props;
    if (indexQuestion < questions.length - 1) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
      }));
    } else history.push('/feedback');
  };

  render() {
    const { questions, indexQuestion } = this.state;
    const { history } = this.props;
    return (
      <MainGame>
        <Header history={ history } />
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
  url: state.fetch.url,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
