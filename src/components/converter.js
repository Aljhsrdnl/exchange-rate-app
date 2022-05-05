import "./converter.css";
import RateDiv from "./RateExchangeHolder";
import { useState, useEffect } from "react";
import codes from "../data/cc";
import loading__lottie from "../lotties/Loading_circle.json";
import Lottie from "react-lottie";
const Converter = (props) => {
  //states
  const [num, setNum] = useState(0); //amount to be converted
  const [exchangeValue, setExchangeValue] = useState(0); //computed value
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrecyTo] = useState("PHP");
  const [rates, setRates] = useState([]); //rates container
  const [isLoading, setIsLoading] = useState(false);
  const [isNan, setIsNan] = useState(false);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loading__lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async (currencyFrom) => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8080/${currencyFrom}`);
      const json = await res.json();
      setIsLoading(false);
      setRates(json.rates);
    }

    fetchData(currencyFrom);
  }, [currencyFrom]);
  

  useEffect(() => {
    computeExchangeValue();
  }, [num, currencyFrom, currencyTo, rates]);

  //how to index the rate object
  // console.log(rates[currencyTo]);
  // -------------------WORK ON THIS LATER--------------------------
  const handleInput = (e) => {
    const num = e.target.value;

    if (isNaN(num)) {
      setIsNan(true);
      return;
    } else {
      setIsNan(false);
      setNum(num);
    }
  };

  const computeExchangeValue = () => {
    const val = num * rates[currencyTo];
    setExchangeValue(val);
  };

  const handleCurrencyFrom = (e) => {
    setCurrencyFrom(e.target.value);
    // console.log(`${currencyFrom} and ${currencyTo}`);
    computeExchangeValue();
  };

  const handleCurrencyTo = (e) => {
    console.log("currencyTo changed!");
    setCurrecyTo(e.target.value);

    currencyFrom !== 0 && computeExchangeValue();
  };

  return (
    <div className="converter__wrapper">
      <div className="module">
        <div className="fromDiv">
          <div className="currency__wrapper">
            <div className="inputDiv">
              <p className="you__have">You have</p>
              <input
                className="input"
                onChange={handleInput}
                placeholder="0.00"
              />
            </div>
            <select value={currencyFrom} onChange={handleCurrencyFrom}>
              {codes.map((code) => (
                <option value={code[0]}>{code[1]}</option>
              ))}
            </select>
            <small className="error__msg">
              {isNan && `Please enter a valid number.`}
            </small>
          </div>
        </div>
        {isLoading && (
          <div className="loading__lottie__div">
            <Lottie options={loadingOptions} width={50} height={50} />
          </div>
        )}
        <div className="fromDiv">
          <div className="currency__wrapper">
            <div className="inputDiv">
              <RateDiv rateVal={exchangeValue} />
            </div>
            <select value={currencyTo} onChange={handleCurrencyTo}>
              {codes.map((code) => (
                <option value={code[0]}>{code[1]}</option>
              ))}
            </select>
          </div>
        </div>
        {/* <button className="getRate" onClick={computeExchangeValue}>
          GET RATE
        </button> */}
      </div>
    </div>
  );
};

export default Converter;
