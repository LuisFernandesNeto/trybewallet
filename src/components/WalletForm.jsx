import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchangeRates } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  buttonClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchExchangeRates(this.state));
    this.setState((prevstate) => (
      { value: '',
        description: '',
        method: 'Dinheiro',
        tag: 'Alimentação',
        currency: 'USD',
        id: prevstate.id + 1 }
    ));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div>
        <form onSubmit={ this.buttonClick }>
          Valores
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
          Descrição das Despesas
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
          Moeda
          <select
            onChange={ this.handleChange }
            name="currency"
            value={ currency }
            data-testid="currency-input"
          >
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>{curr}</option>
            ))}
          </select>
          <select
            onChange={ this.handleChange }
            name="method"
            value={ method }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export default connect(mapStateToProps)(WalletForm);
