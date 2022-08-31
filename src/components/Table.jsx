import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buttonExcludeExpense, buttonEditExpense } from '../redux/actions';

class Table extends Component {
  deleteClick = (id) => {
    const { dispatch } = this.props;
    dispatch(buttonExcludeExpense(id));
  };

  editClick = (id) => {
    const { dispatch } = this.props;
    dispatch(buttonEditExpense(id));
  };

  render() {
    const { expenses } = this.props;
    const tableInfo = expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description }</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{Number((expense.value)).toFixed(2)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {
            (expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)
          }

        </td>
        <td>Real</td>
        <td>
          <button
            onClick={ () => this.deleteClick(expense.id) }
            type="button"
            data-testid="delete-btn"
          >
            X
          </button>
          <button
            onClick={ () => this.editClick(expense.id) }
            type="button"
            data-testid="edit-btn"
          >
            Editar
          </button>
        </td>
      </tr>

    ));
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
