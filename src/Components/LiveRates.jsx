import '../Styles/LiveRates.css';
import { useEffect, useState } from 'react';

function LiveRates() {
  // State variables
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [currencies, setCurrencies] = useState(['CAD', 'USD', 'RUB', 'HKD']);
  const [selectedNewCurrency, setSelectedNewCurrency] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);

  // Function to handle currency deletion
  const handleDelete = (currency) => {
    setRowsToDelete((prevRows) => [...prevRows, currency]);
    setCurrencies((prevCurrencies) => prevCurrencies.filter((curr) => curr !== currency));
  };
  // Function to handle "Done" button click
  const handleDone = () => {
    setRowsToDelete([]);
    setShowDeleteButton(false);
  };
  // Function to handle addition of a new currency
  const handleAddCurrency = () => {
    if (selectedNewCurrency && !currencies.includes(selectedNewCurrency)) {
      setCurrencies((prevCurrencies) => [...prevCurrencies, selectedNewCurrency]);
      setSelectedNewCurrency('');
    }
  };
  // Function to handle currency click
  const handleCurrencyClick = (clickedCurrency) => {
    // Swap selectedCurrency and clickedCurrency
    const newCurrencies = currencies.map((currency) => {
      if (currency === clickedCurrency) {
        return selectedCurrency;
      } else if (currency === selectedCurrency) {
        return clickedCurrency;
      } else {
        return currency;
      }
    });
  
    setSelectedCurrency(clickedCurrency);
    setCurrencies(newCurrencies);

    // Fetch new exchange rates for the selectedCurrency
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5xYPjNyOkAtaVLiwQjepWvuYGg8jQPpDt2MQah02&base_currency=${clickedCurrency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.data);
        const options = Object.keys(data.data);
        const filteredOptions = options.filter(item => !clickedCurrency.includes(item) && !newCurrencies.includes(item));
        setCurrencyOptions(filteredOptions);
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  };

  useEffect(() => {
     // Fetch initial exchange rates and currency options on component mount or when dependencies change
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5xYPjNyOkAtaVLiwQjepWvuYGg8jQPpDt2MQah02&base_currency=${selectedCurrency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.data);
        const options = Object.keys(data.data);
        const filteredOptions = options.filter(item => !selectedCurrency.includes(item) && !currencies.includes(item));
        setCurrencyOptions(filteredOptions);
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  }, [selectedCurrency, currencies]);

  
  return (
    <>
      <div id="market">
        <div className="con">
          <h2 className="market-h2">Xe Live Exchange Rates</h2>

          <div className="market-table">
            <div className="table-row">
              <div className="checkbox-container full-width table-padding-right">
                <p className='p-1'>Inverse</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className='full-width'>Amount</p>
              <p className='full-width'>Change (24h)</p>
              <div className='full-width-end right-side table-padding-left'>
              <button className="Table-edit" onClick={showDeleteButton ? handleDone : setShowDeleteButton}>
                {showDeleteButton ? 'Done' : 'Edit'}
              </button>
              </div>
            </div>

            {/* Existing row */}
            <div className="table-row select-table">
              <p className='select-currency full-width table-padding-right'>{selectedCurrency}</p>
              <p className='full-width'>1</p>
              <p className='full-width'>1</p>
              <p className='full-width table-padding-left'></p>
            </div>

            {/* New rows from API */}
            {currencies.map((currency) => (
        !rowsToDelete.includes(currency) && (
          <div className="table-row" key={currency}>
            <p
              className={`full-width select-currency table-padding-right ${selectedCurrency === currency ? 'selected' : ''}`}
              onClick={() => handleCurrencyClick(currency)}
            >
              {currency}
            </p>
            <p className='full-width'>{exchangeRates[currency]}</p>
            <p className='full-width'>1</p>
            <div className='full-width-end right-side table-padding-left'>
              <button
                className={`max-width  ${showDeleteButton ? 'delete-button' : 'hidden-button'}`}
                onClick={() => handleDelete(currency)}
              >
                -
              </button>
            </div>
          </div>
        )
      ))}
          </div>

          {/* Add new currency section */}
          <div>
            <label>Add New Currency:</label>
            <select
              value={selectedNewCurrency}
              onChange={(e) => setSelectedNewCurrency(e.target.value)}
            >
              <option value="" disabled >
                Select Currency
              </option>
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={handleAddCurrency}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveRates;
