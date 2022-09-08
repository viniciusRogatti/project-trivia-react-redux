import React, { Component } from 'react';

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

  handleClick = () => {

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
