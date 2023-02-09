import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearScore } from '../redux/actions';
import MainFeedback from '../styles/feedbackStyles/MainFeedback';
import FooterFeedback from '../styles/feedbackStyles/FooterFeedback';
import LogoStyle from '../styles/LogoStyle';
import AvatarStyle from '../styles/feedbackStyles/Avatar';
import ContainerBox from '../styles/feedbackStyles/ContainerBox';
import ButtonStyle from '../styles/ButtonStyle';
import ContainerButton from '../styles/feedbackStyles/ContainerButton';
import { addRanking } from '../services/storage';

class Feedback extends Component {
  state = {
    name: '',
    score: 0,
    avatar: '',
  };

  componentDidMount() {
    const { avatar, name, score } = this.props;
    const avatarImg = `https://www.gravatar.com/avatar/${avatar}`;
    this.setState({ name, score, avatar: avatarImg });
  }

  handleClick = ({ target: { name } }) => {
    addRanking(this.state);
    const { history, dispatch } = this.props;
    history.push(name);
    dispatch(clearScore());
  };

  render() {
    const { assertions, score, history } = this.props;
    const { avatar } = this.state;
    const THREE = 3;
    return (
      <MainFeedback data-testid="feedback-text">
        <Header history={ history } />
        <LogoStyle className="logo-feedback" />
        <AvatarStyle src={ avatar } alt="avatar" />
        <ContainerBox>
          <h2
            data-testid="feedback-text"
            className={ assertions >= THREE ? 'green' : 'red' }
          >
            { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
          </h2>
          <strong data-testid="feedback-total-question">{ assertions }</strong>
          <span data-testid="feedback-total-score">{ score }</span>
        </ContainerBox>
        <ContainerButton>
          <ButtonStyle
            className="btn-ranking"
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-ranking"
            name="/ranking"
          >
            Ranking
          </ButtonStyle>
          <ButtonStyle
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play-again"
            name="/"
          >
            Play Again
          </ButtonStyle>
        </ContainerButton>
        <FooterFeedback />
      </MainFeedback>
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
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  avatar: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Feedback);
