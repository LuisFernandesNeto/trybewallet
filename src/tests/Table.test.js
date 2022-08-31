import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const initialState = {
  user: {
    email: 'lfn_hardrock@hotmail.com',
    disabled: false,
    password: 'asdsadsd',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        value: '15',
        description: 'Gastei Demais',
        method: 'Dinheiro',
        tag: 'Alimentação',
        currency: 'USD',
        id: 0,
        exchangeRates: mockData }],
    editor: false,
    idToEdit: 0,
  },
};

describe('Login de usuários', () => {
  test('Verifica se a tela home é renderizada', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: 'X' });
    expect(deleteButton).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: 'Editar' });
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const redux = store.getState();
    expect(redux.wallet.editor).toBeTruthy();

    userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
  });
});
