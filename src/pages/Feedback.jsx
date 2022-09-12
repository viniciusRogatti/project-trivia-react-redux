import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './arquivotemporario.css';
import { clearScore } from '../redux/actions';

class Feedback extends Component {
  handleClick = ({ target: { name } }) => {
    const { history, dispatch } = this.props;
    if (name === 'play-again') history.push('/');
    if (name === 'ranking') history.push('/ranking');
    dispatch(clearScore());
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div>
          <p>
            Você Acertou:
            <strong data-testid="feedback-total-question">{ assertions }</strong>
            perguntas
          </p>
          <p data-testid="feedback-text">
            { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
          name="play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
          name="ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
