import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Login de usuários', () => {
  test('Verifica se a tela home é renderizada', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('Verifica se a tela carteira é renderizada', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const emailElement = screen.getByTestId('email-field');
    expect(emailElement).toBeInTheDocument();

    const totalElement = screen.getByTestId('total-field');
    expect(totalElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /adicionar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('Se faz o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'luisfernandesneto@gmail.com');
    userEvent.type(inputPassword, 'xablau');

    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonElement);

    expect(history.location.pathname).toBe('/carteira');

    /* const buttonEdit = screen.getByRole('button', { name: /editar/i });
    expect(buttonEdit).toBeInTheDocument();

    const buttonDelete = screen.getByRole('button', { name: /x/i });
    expect(buttonDelete).toBeInTheDocument(); */
  });

  test('Se chama a função', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
