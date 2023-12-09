import { useState, useEffect } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import "../../Styles/HeaderSections/Convert.css";

const Convert = () => {
  const handleSwitchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const [amount, setAmount] = useState("");

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_GOADoaUR68WLhGybdVUrPgfquKykdmAfQMX8yP6h&base_currency=${fromCurrency}`,
        );
        if (!response.ok) {
          throw new Error("Error!");
        }
        const data = await response.json();
        setExchangeRate(data.data[toCurrency]);
        const options = Object.keys(data.data);
        setCurrencyOptions(options);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConversion = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      setConversionResult(""); // Clear previous conversion result
    } else {
      setConversionResult(
        <div>
          <p className="amout-text">
            {amount} {fromCurrency} ={" "}
            <p className="result-big-text">
              {converted} {toCurrency}.
            </p>
          </p>
          <p className="text-grey">
            1 {fromCurrency} = {exchangeRate} {toCurrency}.
          </p>
          <p className="text-grey">
            1 {toCurrency} = {(1 / exchangeRate).toFixed(6)} {fromCurrency}.
          </p>
        </div>,
      );
      setError(""); // Clear previous error
    }
  };

  const converted = (parseFloat(amount) * exchangeRate).toFixed(6);

  return (
    <>
      <form className="form-convert">
        <div className="form-inputs">
          <div className="input-con">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="Amount_input"
            />
          </div>

          <div className="select-con">
            <label>From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="circle-con">
            <label className="hidden">1</label>
            <div className="circle" onClick={handleSwitchCurrencies}>
              <svg
                className="circle-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="select-con">
            <label>To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <div className="error-message">
            <p className="text-red">{error}</p>
          </div>
        )}
        {conversionResult && (
          <div className="convert-result">
            <p>{conversionResult}</p>
          </div>
        )}
        <div className="info-but-con">
          <div className="currency-attention">
            <div className="icon-box">
              <IconInfoCircle className="info-icon" />
            </div>
            <p className="small-text">
              We use the mid-market rate for our Converter. This is for
              informational purposes only. You won&rsquo;t receive this rate
              when sending money.{" "}
              <a className="small-text small-link-text" href="#">
                Login to view send rates
              </a>{" "}
            </p>
          </div>
          <button className="Convert-but" onClick={handleConversion}>
            Convert
          </button>
        </div>
      </form>
    </>
  );
};

export default Convert;
