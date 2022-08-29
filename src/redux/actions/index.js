export const ADD_EMAIL = 'EMAIL';
export const ADD_WALLET = 'WALLET';

export const user = (payload) => ({
  type: 'EMAIL',
  payload,
});

export const wallet = (payload) => ({
  type: 'WALLET',
  payload,
});
