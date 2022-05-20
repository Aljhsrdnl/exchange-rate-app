import { useState, useEffect } from "react";


const RateExchangeHolder = ({ rateVal }) => {

  
  //states
  const [commas, setCommas] = useState("0");
  const putCommas = (rateVal) => {
    const fixedNum = rateVal.toFixed(3);
    var commas = fixedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCommas(commas);
  };

  useEffect(() => {
    putCommas(rateVal);
  }, [rateVal]);
  return (
    <div className="input__div">
      <p className="you__have">You get</p>
      
      <input type="text" className="input" readOnly value={commas} />
    </div>
  );
};

export default RateExchangeHolder;
