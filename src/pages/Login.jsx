import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import { saveToken } from '../services/storage';
import { playerAction } from '../redux/actions/index';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { name: userName, email } = this.state;
      const validation = userName.length === 0 || email.length === 0;
      this.setState({ isDisabled: validation });
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const token = await fetchApi();
    saveToken(token);
    dispatch(playerAction(this.state));
    history.push('/playpage');
  };

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          User Name:
          <input
            value={ name }
            name="name"
            type="text"
            onChange={ this.onInputChange }
            id="input-player-name"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            value={ email }
            name="email"
            type="email"
            onChange={ this.onInputChange }
            // id="input-gravatar-email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToSettings }
        >
          Settings ⚙️
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
