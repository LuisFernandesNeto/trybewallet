import getCurrentCurrencies from '../../services/walletApi';

export const ADD_EMAIL = 'EMAIL';
export const ADD_WALLET = 'WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECIEVE_CURRENCIES_SUCCESS = 'RECIEVE_CURRENCIES_SUCCESS';
export const RECIEVE_CURRENCIES_FAILURE = 'RECIEVE_CURRENCIES_FAILURE';
export const BUTTON_EXCLUDE = 'BUTTON_EXCLUDE';
export const BUTTON_EDIT = 'BUTTON_EDIT';
export const BUTTON_UPDATE = 'BUTTON_UPDATE';

export const user = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const wallet = (payload) => ({
  type: ADD_WALLET,
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

export const fetchExchangeRates = (state) => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const response = await getCurrentCurrencies();
    dispatch(wallet({ ...state, exchangeRates: response }));
  } catch (error) {
    dispatch(recieveCurrenciesFailure(error));
  }
};

export const buttonExcludeExpense = (payload) => ({
  type: BUTTON_EXCLUDE,
  payload,
});

export const buttonEditExpense = (payload) => ({
  type: BUTTON_EDIT,
  payload,
});

export const buttonUpdateExpense = (payload) => ({
  type: BUTTON_UPDATE,
  payload,
});
