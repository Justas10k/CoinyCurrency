import  { useState, useEffect } from 'react';
import '../Styles/Header.css';
import CurrencyRow from './Currencyrow';

const Header = () => {
  // API key and base currency code
  const apikey = 'SXFVPmaHIsBn9KF4RQzkqwsj4Ybax55U';
  const base_code = 'USD';

  // API endpoint for fetching exchange rates
  const BASE_URL = `https://open.er-api.com/v6/latest/${base_code}?apikey=${apikey}`;

  // State variables to manage currency data and user inputs
  const [currencyNames, setCurrencyNames] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency1, setSelectedCurrency1] = useState('USD');
  const [selectedCurrency2, setSelectedCurrency2] = useState('EUR');
  const [inputValue1, setInputValue1] = useState(1);
  const [inputValue2, setInputValue2] = useState(0);
  const [isCurrencyChange, setIsCurrencyChange] = useState(false);

  // Effect to fetch exchange rates on component mount
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const rates = data.rates;
        setExchangeRates(rates);
        const currencyNames = Object.keys(rates);
        setCurrencyNames(currencyNames);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Effect to update input2 when input1 changes, and vice versa
  useEffect(() => {
    if (!isCurrencyChange) {
      setInputValue2((inputValue1 * exchangeRates[selectedCurrency1]) / exchangeRates[selectedCurrency2]);
    }
  }, [inputValue1, selectedCurrency1, selectedCurrency2, exchangeRates, isCurrencyChange]);

  useEffect(() => {
    if (!isCurrencyChange) {
      setInputValue1((inputValue2 * exchangeRates[selectedCurrency2]) / exchangeRates[selectedCurrency1]);
    }
  }, [inputValue2, selectedCurrency1, selectedCurrency2, exchangeRates, isCurrencyChange]);

  // Function to handle currency changes for input1
  const handleCurrencyChange1 = (newCurrency) => {
    setIsCurrencyChange(true);
    setSelectedCurrency1(newCurrency);
    setIsCurrencyChange(false);
  };

  // Function to handle currency changes for input2
  const handleCurrencyChange2 = (newCurrency) => {
    setIsCurrencyChange(true);
    setSelectedCurrency2(newCurrency);
    setIsCurrencyChange(false);
  };

  // Function to handle input changes for input1
  const handleInputChange1 = (newInputValue) => {
    setInputValue1(newInputValue);
  };

  // Function to handle input changes for input2
  const handleInputChange2 = (newInputValue) => {
    setInputValue2(newInputValue);
  };

  // JSX to render the header and currency converter
  return (
    <>
      <header id='home'>
        <div className='con text-center'>
          <h1>
            TRACK AND TRADE <br /> CRYPTO CURRENCIES
          </h1>
          <p>Best source for currency conversion, sending money online, and tracking exchange rates</p>

          <div className='converter'>
            <h1>Currency</h1>
            {/* First CurrencyRow component */}
            <CurrencyRow
              currencyNames={currencyNames}
              exchangeRates={exchangeRates}
              selectedCurrency={selectedCurrency1}
              setSelectedCurrency={handleCurrencyChange1}
              inputValue={inputValue1}
              setInputValue={handleInputChange1}
            />
            <div className='equals'>=</div>
            {/* Second CurrencyRow component */}
            <CurrencyRow
              currencyNames={currencyNames}
              exchangeRates={exchangeRates}
              selectedCurrency={selectedCurrency2}
              setSelectedCurrency={handleCurrencyChange2}
              inputValue={inputValue2}
              setInputValue={handleInputChange2}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;