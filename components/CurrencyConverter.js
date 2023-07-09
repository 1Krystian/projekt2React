import React, { useState, useEffect } from 'react';
const { getExchangeRate } = require('../services/apiService');


const CurrencyConverter = () => {
  const [currencyLabel, setCurrencyLabel] = useState('PLN');
  const [currencyOne, setCurrencyOne] = useState('USD');
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState('');
  const [rateInfo, setRateInfo] = useState('');

  const calculate = () => {
    const amount = parseFloat(amountOne);

    if (isNaN(amount) || amount <= 0) {
      setAmountTwo('');
      setCurrencyLabel('PLN');
      setRateInfo('');

      if (amount === 0) {
        alert('Wprowadź liczbę większą niż 0.');
      } else {
        alert('Wprowadź liczbę dodatnią.');
      }

      return;
    }

    getExchangeRate(currencyOne)
      .then((rate) => {
        if (rate) {
          setCurrencyLabel('PLN');
          setRateInfo(`1 ${currencyOne} = ${rate.toFixed(2)} PLN`);
          setAmountTwo((amount * rate).toFixed(2));
        } else {
          setCurrencyLabel('');
          setRateInfo('Nie można pobrać danych kursu waluty');
        }
      })
      .catch(() => {
        setCurrencyLabel('');
        setRateInfo('Wystąpił błąd przy pobieraniu danych');
      });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="wrapper">
      <h1 className="heading">Exchange Rate App</h1>
      <p className="lower-title">Sprawdź aktualne kursy walut!</p>

      <div className="app-body">
        <div className="section-left">
          <input
            className="inputs"
            type="number"
            id="amount-one"
            value={amountOne}
            onChange={(e) => setAmountOne(e.target.value)}
          />
          <select
            className="selects"
            id="currency-one"
            value={currencyOne}
            onChange={(e) => setCurrencyOne(e.target.value)}
          >
            <option className="options" value="USD">USD</option>
            <option className="options" value="EUR">EUR</option>
            <option className="options" value="CHF">CHF</option>
          </select>
        </div>

        <div className="section-right">
          <input className="inputs" type="text" id="amount-two" value={amountTwo} disabled />
          <span className="currency-label" id="currency-label">{currencyLabel}</span>
        </div>
      </div>
      <p className="rate-info">{rateInfo}</p>
      <button className="calculate-button" id="calculate-button" onClick={calculate}>
        Przelicz
      </button>
    </div>
  );
};

export default CurrencyConverter;
s