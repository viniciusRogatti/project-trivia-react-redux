import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentRanking from '../styles/rankingStyle/ContentRanking';
import MainRanking from '../styles/rankingStyle/mainRanking';
import Span from '../styles/rankingStyle/scoreRanking';
import image from '../styles/_imgs/Vector.svg';
import ButtonRanking from '../styles/rankingStyle/bottomRanking';
import LogoStyle from '../styles/LogoStyle';

import { getRankingList } from '../services/storage';

class Ranking extends Component {
  state = {
    storage: [],
  };

  componentDidMount() {
    const storage = getRankingList();
    this.setState({ storage });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { storage } = this.state;
    return (
      <MainRanking>
        <ContentRanking>
          <LogoStyle className="logo-ranking" />
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul>
            {
              storage.map((player, index) => (
                <li key={ `id-${player.name}` }>
                  <div>
                    <img src={ player.avatar } alt="avatar" />
                    <span data-testid={ `player-name-${index}` }>{player.name}</span>
                  </div>
                  <Span
                    data-testid={ `player-score-${index}` }
                  >
                    <img src={ `${image}` } alt="" />
                    <p>
                      <strong>{player.score}</strong>
                      pontos
                    </p>
                  </Span>
                </li>
              ))
            }
          </ul>
          <ButtonRanking
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Home
          </ButtonRanking>
        </ContentRanking>
      </MainRanking>
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
