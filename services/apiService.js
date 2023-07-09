const getExchangeRate = async (currency) => {
  try {
    const response = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`
    );
    const data = await response.json();

    if (
      data.rates &&
      Array.isArray(data.rates) &&
      data.rates.length > 0 &&
      data.rates[0].mid
    ) {
      return data.rates[0].mid;
    } else {
      throw new Error("Nie można pobrać danych kursu waluty");
    }
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych");
  }
};

export default getExchangeRate;
