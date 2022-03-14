import "./converter.css";
import RateDiv from "./RateExchangeHolder";
import { useState, useEffect } from "react";
import country_code from "../data/country_code";

function Converter() {
  //states
  const [num, setNum] = useState(0);
  const [exchangeValue, setExchangeValue] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrecyTo] = useState("PHP");
  const [rates, setRates] = useState([]);

  const handleInput = (e) => {
    const num = e.target.value;
    const n = num.toString().replace(/,/g, "");
    const commas = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    e.target.value = commas;
    setNum(n);
  };

  useEffect(() => {
    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${process.env.REACT_APP_KEY}&base_currency=${currencyFrom}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        setRates(data.data);
      })
      .catch((error) => console.log(error));
  }, [currencyFrom]);

  const handleCurrencyFrom = (e) => {
    setCurrencyFrom(e.target.value);
  };

  const handleCurrencyTo = (e) => {
    setCurrecyTo(e.target.value);
  };

  const computeExchangeValue = () => {
    const val = num * rates[currencyTo].value;

    setExchangeValue(val);
  };

  return (
    <div className="converter__wrapper">
      <div className="module">
        <div className="fromDiv">
          <div className="currency__wrapper">
            <div className="inputDiv">
              <p className="you__have">You have</p>
              <input
                type="number"
                className="input"
                onChange={handleInput}
                placeholder="0.00"
                min="0.01"
              />
            </div>
            <select value={currencyFrom} onChange={handleCurrencyFrom}>
              {country_code.map((country) => (
                <option value={country[0]}>{country[1]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="fromDiv">
          <div className="currency__wrapper">
            <div className="inputDiv">
              <RateDiv rateVal={exchangeValue} />
            </div>
            <select value={currencyTo} onChange={handleCurrencyTo}>
              {country_code.map((country) => (
                <option value={country[0]}>{country[1]}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="getRate" onClick={computeExchangeValue}>
          GET RATE
        </button>
      </div>
    </div>
  );
}

export default Converter;
