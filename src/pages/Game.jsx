import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchTrivia from '../services/fetchTrivia';
import { getToken } from '../services/storage';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    questions: [],
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

  render() {
    const { questions } = this.state;

    return (
      <h2>
        <Header />
        { questions.length > 0 && <Questions question={ questions[0] } /> }
      </h2>
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
