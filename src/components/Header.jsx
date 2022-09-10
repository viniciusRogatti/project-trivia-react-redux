import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { FiSettings } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { connect } from 'react-redux';
import { gravatarAction } from '../redux/actions';
import HeaderStyle from '../styles/headerStyles/HeaderStyle';

class Header extends Component {
  state = {
    hashEmail: '',
  };

  componentDidMount() {
    const { email, dispatch } = this.props;
    const hashEmail = md5(email).toString();
    this.setState({ hashEmail });
    dispatch(gravatarAction(hashEmail));
  }

  render() {
    const { name, score } = this.props;
    const { hashEmail } = this.state;
    return (
      <HeaderStyle>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="gravatar img"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <FaStar className="star-icon" />
        <span data-testid="header-score">
          Pontos:
          <strong>{score}</strong>
        </span>
        <FiSettings />
      </HeaderStyle>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);
