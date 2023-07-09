const getExchangeRate = (currency) => {
  return fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`)
    .then((res) => res.json())
    .then((data) => {
      if (
        data.rates &&
        Array.isArray(data.rates) &&
        data.rates.length > 0 &&
        data.rates[0].mid
      ) {
        return data.rates[0].mid;
      } else {
        throw new Error('Nie można pobrać danych kursu waluty');
      }
    });
};

module.exports = {
  getExchangeRate
};
