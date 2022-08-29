const API_CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentCurrencies = async () => {
  const response = await fetch(API_CURRENCIES_URL);
  const json = await response.json();
  return json;
};

export default getCurrentCurrencies;
