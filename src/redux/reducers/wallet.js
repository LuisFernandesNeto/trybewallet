import { RECIEVE_CURRENCIES_SUCCESS, ADD_WALLET, BUTTON_EXCLUDE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIEVE_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.currencies };
  case ADD_WALLET:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case BUTTON_EXCLUDE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  default:
    return state;
  }
};

export default wallet;
