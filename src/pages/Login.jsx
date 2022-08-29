import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user } from '../redux/actions';

const MIN_LENGTH = 6;

class Login extends React.Component {
  state = {
    disabled: true,
    password: '',
    email: '',
  };

  isButtonDisabled = () => {
    const { password, email } = this.state;
    const validPassword = password.length >= MIN_LENGTH;
    const validEmail = (/\S+@\S+\.\S+/).test(email);
    let isDisable = true;
    if (validEmail && validPassword) isDisable = false;
    this.setState(() => ({
      disabled: isDisable,
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.isButtonDisabled);
  };

  buttonClick = () => {
    const { dispatch, history } = this.props;
    dispatch(user(this.state));
    history.push('/carteira');
  };

  render() {
    const { password, email, disabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            name="email"
            id="email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          email
        </label>
        <label htmlFor="password">
          <input
            name="password"
            id="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
          password
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.buttonClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
