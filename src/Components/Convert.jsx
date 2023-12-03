import { useState, useEffect } from 'react';
import '../Styles/Convert.css';

const Convert = () => {
  const [amount, setAmount] = useState('');
  //options
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const apiKey = 'SXFVPmaHIsBn9KF4RQzkqwsj4Ybax55U';
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`
        );
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
        const options = Object.keys(data.rates);
        setCurrencyOptions(options);

      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConversion = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    const converted = (parseFloat(amount) * exchangeRate).toFixed(6);

    // Store the conversion result in the new state
    setConversionResult(  <div>
    <p>
      {amount} {fromCurrency} is equal to {converted} {toCurrency}.
    </p>
    <p>
      1 {fromCurrency} is worth {exchangeRate} {toCurrency}.
    </p>
    <p>
      1 {toCurrency} is worth {(1 / exchangeRate).toFixed(6)} {fromCurrency}.
    </p>
  </div>);
  };

  return (
    <>
      <form className='form-convert'>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
          />
        </div>

        <div>
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

        <div>
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

      </form>

      <button onClick={handleConversion}>Convert</button>
      {conversionResult && (
        <div>
          <p>{conversionResult}</p>
        </div>
      )}

    </>
  );
};

export default Convert;
