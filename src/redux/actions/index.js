import getCurrentCurrencies from '../../services/walletApi';

export const ADD_EMAIL = 'EMAIL';
export const ADD_WALLET = 'WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECIEVE_CURRENCIES_SUCCESS = 'RECIEVE_CURRENCIES_SUCCESS';
export const RECIEVE_CURRENCIES_FAILURE = 'RECIEVE_CURRENCIES_FAILURE';

export const user = (payload) => ({
  type: 'EMAIL',
  payload,
});

export const wallet = (payload) => ({
  type: 'WALLET',
  payload,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const recieveCurrenciesSuccess = (currencies) => ({
  type: RECIEVE_CURRENCIES_SUCCESS,
  currencies,
});

const recieveCurrenciesFailure = (errorMessage) => ({
  type: RECIEVE_CURRENCIES_FAILURE,
  error: errorMessage,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const response = await getCurrentCurrencies();
    const filteredCurrencies = Object.keys(response).filter((currency) => (
      currency !== 'USDT'
    ));
    dispatch(recieveCurrenciesSuccess(filteredCurrencies));
  } catch (error) {
    dispatch(recieveCurrenciesFailure(error));
  }
};
