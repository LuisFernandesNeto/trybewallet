import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const everyValue = expenses.map((expense) => (
      expense.value * expense.exchangeRates[expense.currency].ask
    )).reduce((acc, curr) => (acc + curr), 0).toFixed(2);
    return (
      <div>
        <p data-testid="email-field">
          { `Email: 
          ${email}`}
        </p>
        <p data-testid="total-field">
          {everyValue}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
