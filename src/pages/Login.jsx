import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import { saveToken } from '../services/storage';
import { playerAction } from '../redux/actions/index';
import LogoStyle from '../styles/LogoStyle';
import MainStyle from '../styles/MainStyle';
import { BoxLoginStyle, BgStyle } from '../styles/loginStyles/LoginSyles';
import ButtonStyle from '../styles/ButtonStyle';
import ButtonSettings from '../styles/loginStyles/ButtonSetting';
import IconTrybe from '../styles/IconTrybe';

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
      <MainStyle>
        <LogoStyle />
        <BgStyle />
        <BoxLoginStyle>
          <input
            value={ email }
            name="email"
            type="email"
            onChange={ this.onInputChange }
            id="input-gravatar-email"
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu e-mail do gravatar?"
          />
          <input
            value={ name }
            name="name"
            type="text"
            onChange={ this.onInputChange }
            id="input-player-name"
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
          />
          <ButtonStyle
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </ButtonStyle>
          <ButtonSettings
            type="button"
            data-testid="btn-settings"
            onClick={ this.goToSettings }
          >
            <FiSettings />
          </ButtonSettings>

        </BoxLoginStyle>
        <IconTrybe />
      </MainStyle>
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
