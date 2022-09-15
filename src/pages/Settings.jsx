import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { urlAction } from '../redux/actions';
import fetchCategories from '../services/fetchCategories';
import MainSettings from '../styles/settingsStyles/MainSettings';
import BodySettings from '../styles/settingsStyles/BodySettings';
import LogoStyle from '../styles/LogoStyle';
import SelectSettings from '../styles/settingsStyles/SelectSettings';
import ButtonStyle from '../styles/ButtonStyle';

class Settings extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await fetchCategories();
    this.setState({ categories });
  }

  onChange = ({ target: { value, name } }) => {
    const { categories } = this.state;
    switch (name) {
    case 'categories':
      return this.setState({ id: `&category=${categories
        .find((category) => category.name === value).id}` });
    case 'difficulty':
      return this.setState({ difficulty: `&difficulty=${value.toLowerCase()}` });
    default:
      return this.setState(
        { type: `&type=${value === 'Multiple Choise' ? 'multiple' : 'boolean'}` },
      );
    }
  };

  handleClick = () => {
    this.urlFilterTrivia(this.state);
  };

  urlFilterTrivia = ({ id = '', difficulty = '', type = '' }) => {
    const { dispatch, token, history } = this.props;
    console.log(token);
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}${id}${difficulty}${type}`;
    dispatch(urlAction(URL));
    history.push('/');
  };

  render() {
    const { categories } = this.state;
    return (
      <BodySettings>
        <LogoStyle className="logo-Settings" />
        <MainSettings data-testid="settings-title">
          <h1>configurações</h1>
          <SelectSettings
            className="select-settings"
            name="categories"
            onChange={ this.onChange }
          >
            <option>
              Category
            </option>
            {categories?.map(({ name, id }) => (
              <option name={ id } key={ `category-id-${id}` }>
                {name}
              </option>
            ))}
          </SelectSettings>
          <SelectSettings
            className="select-settings"
            name="difficulty"
            onChange={ this.onChange }
          >
            <option>
              Difficulty
            </option>
            <option>
              Easy
            </option>
            <option>
              Medium
            </option>
            <option>
              Hard
            </option>
          </SelectSettings>
          <SelectSettings
            className="select-settings"
            name="type"
            onChange={ this.onChange }
          >
            <option>
              Type
            </option>
            <option>
              Multiple Choise
            </option>
            <option>
              True/False
            </option>
          </SelectSettings>
          <ButtonStyle type="button" onClick={ this.handleClick }>
            Play
          </ButtonStyle>
        </MainSettings>
      </BodySettings>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.fetch.token,
});

export default connect(mapStateToProps)(Settings);
