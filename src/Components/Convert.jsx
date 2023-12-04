import { useState, useEffect } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import '../Styles/Convert.css';

const Convert = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_I5OEo7N2IbSLAV5DWY2HwGo0FD8MKF0JmGywYdv9&base_currency=USD'
        );
        const data = await response.json();
        setExchangeRates(data.data);
        const options = Object.keys(data.data);
        setCurrencyOptions(options);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (fromCurrency !== toCurrency) {
      setConversionResult(null);
    }
  }, [fromCurrency, toCurrency]);

  const handleConversion = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    const converted = (parseFloat(amount) * exchangeRates[toCurrency]).toFixed(6);

    setConversionResult(
      <div className='currency-result-box'>
        <div className='amout-text'>
          {amount} {fromCurrency} = <span className='result-big-text'> {converted} {toCurrency}</span>
        </div>
        <p className='text-grey'>
          1 {fromCurrency} = {(exchangeRates[toCurrency]).toFixed(6)} {toCurrency}
        </p>
        <p className='text-grey'>
          1 {toCurrency} = {(1 / exchangeRates[toCurrency]).toFixed(6)} {fromCurrency}
        </p>
      </div>
    );
  };

  return (
    <>
      
      <form className='form-convert'>
        <div className='form-inputs'>
        <div className='input-con'>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='Amount_input'
          />
        </div>

        <div className='select-con'>
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
        <label className='hidden'>1</label>
        <div className='circle'>
          <svg className="circle-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" aria-hidden="true" ><path  fill="currentColor" d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z" ></path></svg>
        </div>
        </div>
        <div className='select-con'>
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

      {conversionResult && (
        <div className='convert-result'>
          <p>{conversionResult}</p>
        </div>
      )}
      <div className='info-but-con'>
      <div className='currency-attention'>
        <div className='icon-box'>
        <IconInfoCircle className='info-icon'/>
        </div>
        <p className='small-text'>We use the mid-market rate for our Converter. This is for informational purposes only. You won&rsquo;t receive this rate when sending money. <a className='small-text small-link-text' href='#'>Login to view send rates</a> </p>
      </div>
      <button onClick={handleConversion}>Convert</button>
      </div>
      </form>
    </>
  );
};

export default Convert;
