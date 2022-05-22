import "./converter.css";
import RateDiv from "./RateExchangeHolder";
import { useState, useEffect } from "react";
import codes from "../data/cc";
import loading__lottie from "../lotties/Loading_circle.json";
import Lottie from "react-lottie";
import NumberFormat from "react-number-format";
const Converter = (props) => {
  //states
  const [num, setNum] = useState(); //amount to be converted
  const [exchangeValue, setExchangeValue] = useState(); //computed value
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrecyTo] = useState("PHP");
  const [rates, setRates] = useState([]); //rates container
  const [isLoading, setIsLoading] = useState(false);
  const [currency_from_prefix, setCurrencyFromPrefix] = useState("$ ")
  const [currency_to_prefix, setCurrencyToPrefix] = useState("₱ ");

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
      const res = await fetch(`/api/${currencyFrom}`)
        .catch(err => {
          console.log(err)
          
        })
      const json = await res.json();
      setIsLoading(false);
      setRates(json.rates);
    }

    fetchData(currencyFrom);
  }, [currencyFrom]);
  

  useEffect(() => {
    computeExchangeValue();
  }, [num, currencyFrom, currencyTo, rates]);

  
  const handleInput = (val) => {
    const num = val;
      setNum(num);

  };


  const computeExchangeValue = () => {
    const val = num * rates[currencyTo];
    console.log(`values: ${val}`)
    setExchangeValue(val);
  };

  
  const handleCurrencyFrom = (e) => {
    setCurrencyFrom(e.target.value);
    let arr = codes.filter(code => code[0] === e.target.value)
    let prefix = arr[0][2] + " ";
    setCurrencyFromPrefix(prefix);
    computeExchangeValue();
  };
  
  const handleCurrencyTo = (e) => {
    
    setCurrecyTo(e.target.value);
    let arr = codes.filter(code => code[0] === e.target.value)
    let prefix = arr[0][2] + " ";
    setCurrencyToPrefix(prefix);
    currencyFrom !== 0 && computeExchangeValue();
  };

  return (
    <div className="converter__wrapper">
      <div className="module">
        <div className="fromDiv">
          <div className="currency__wrapper">
            <div className="inputDiv">
              <p className="you__have">You have</p>
              
              <NumberFormat 
              placeholder={currency_from_prefix + " 0.00"}
                className="input"
                thousandGroupStyle="thousand"
                value = {num}
                onValueChange={ (numbers) => {
                  let value = numbers.value
                  handleInput(value);
                }}
                prefix={currency_from_prefix}
                decimalSeparator="."
                decimalScale={2}
                type="text"
                thousandSeparator={true}
                allowNegative={false}
              />
            </div>
            <select value={currencyFrom} onChange={handleCurrencyFrom}>
              {codes.map((code) => (
                <option value={code[0]}>{code[1]}</option>
              ))}
            </select>
            
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
            <p className="you__have">You get</p>
              <NumberFormat 
              placeholder={currency_to_prefix + " 0.00"}
                  className="input"
                  thousandGroupStyle="thousand"
                  value = {exchangeValue}
                  prefix={currency_to_prefix}
                  decimalSeparator="."
                  decimalScale={2}
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
            </div>
            <select value={currencyTo} onChange={handleCurrencyTo}>
              {codes.map((code) => (
                <option value={code[0]}>{code[1]}</option>
              ))}
            </select>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Converter;
