import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import { saveToken } from '../services/storage';
import { playerAction, tokenAction } from '../redux/actions/index';
import LogoStyle from '../styles/LogoStyle';
import MainStyle from '../styles/MainStyle';
import { BoxLoginStyle, BgStyle } from '../styles/loginStyles/LoginSyles';
import ButtonStyle from '../styles/ButtonStyle';
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
    const { history, dispatch, filter } = this.props;
    const token = await fetchApi();
    saveToken(token);
    if (!filter) {
      dispatch(tokenAction(token));
    }
    dispatch(playerAction(this.state));
    history.push('/playpage');
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
  filter: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.fetch.filter,
});

export default connect(mapStateToProps)(Login);
