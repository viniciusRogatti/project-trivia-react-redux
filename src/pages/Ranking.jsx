import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    storage: [],
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const lastScore = -1;
    storage.sort((a, b) => (a.score < b.score ? 1 : lastScore));
    this.setState({
      storage,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { storage } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            storage.map((player, index) => (
              <li key={ `id-${player.name}` }>
                <img src={ player.avatar } alt="avatar" />
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  avatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
