import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gravatarAction } from '../redux/actions';

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
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="gravatar img"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{`User Name: ${name}`}</span>
        <span data-testid="header-score">{`Score: ${score}`}</span>
      </header>
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
