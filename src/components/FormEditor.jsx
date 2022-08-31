import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { buttonEditExpense } from '../redux/actions';

export class FormEditor extends Component {
  buttonClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(buttonEditExpense());
  };

  render() {
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
          <button type="submit">Editar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

FormEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(FormEditor);
