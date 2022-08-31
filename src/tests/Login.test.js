import React from 'react';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Login de usuários', () => {
  test('Verifica se a tela home é renderizada', () => {
    renderWithRouterAndRedux(<Login />);

    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
