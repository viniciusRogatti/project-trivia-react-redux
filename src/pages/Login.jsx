import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import { saveToken } from '../services/storage';

export default class Login extends Component {
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
    const token = await fetchApi();
    saveToken(token);
    const { history } = this.props;
    history.push('/playpage');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          <input
            value={ name }
            name="name"
            type="text"
            onChange={ this.onInputChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          <input
            value={ email }
            name="email"
            type="email"
            onChange={ this.onInputChange }
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
