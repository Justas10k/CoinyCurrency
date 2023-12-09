import '../Styles/LiveRates.css';
import { useEffect, useState } from 'react';

function LiveRates() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [currencies, setCurrencies] = useState(['CAD', 'USD', 'RUB', 'JPY']);
  const [selectedNewCurrency, setSelectedNewCurrency] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [currenciesInfo, setCurrenciesInfo] = useState({});

  const [inverse, setInverse] = useState(false);
  const toggleVerse = () => {
    setInverse(!inverse);
  };
  

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
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_GOADoaUR68WLhGybdVUrPgfquKykdmAfQMX8yP6h&base_currency=${clickedCurrency}`;

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

useEffect(() => {
  // Assuming you're making an HTTP request to the API
  const apiUrl = "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_GOADoaUR68WLhGybdVUrPgfquKykdmAfQMX8yP6h";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const currenciesInfo = data.data;
      setCurrenciesInfo(currenciesInfo); // Set the state with the received data
    })
    .catch(error => console.error("Error fetching data:", error));
}, []);
  return (
    <>
      <div id="market">
        <div className="con">
          <h2 className="market-h2">Xe Live Exchange Rates</h2>
          <div className="market-table">
            <div className="table-row">
              <div className="checkbox-container full-width table-padding-right ">
                <p className='p-1'>Inverse</p>
                <label className="switch" >
                  <input type="checkbox" onClick={toggleVerse}/>
                  <span className="slider round"></span>
                </label>
              </div>
              <p className='full-width'>Amount</p>
              <p className='full-width'>Symbol</p>
              <p className='full-width'>Full name</p>
              <div className='full-width-end right-side table-padding-left'>
              <button className="Table-edit " onClick={showDeleteButton ? handleDone : setShowDeleteButton}>
                {showDeleteButton ? 'Done' : 'Edit'}
              </button>
              </div>
            </div>

            <div className="table-row select-table">

            <p className='full-width select-currency table-padding-right'>{selectedCurrency}</p>
            <p className='full-width'>{inverse ? 'inverse' : '1'}</p>
            <p className='full-width'>{currenciesInfo[selectedCurrency]?.symbol || 'Loading...'}</p>
            <p className='full-width'>{currenciesInfo[selectedCurrency]?.name || 'Loading...'}</p>
            <p className='full-width table-padding-left full-width-end'></p>
          </div>
            
{currencies.map((currency) => (
  !rowsToDelete.includes(currency) && (
    <div className="table-row table-border" key={currency}>
      <p
        className={`full-width select-currency table-padding-right ${selectedCurrency === currency ? 'selected' : ''}`}
        onClick={() => handleCurrencyClick(currency)}
      >
        {currency}
      </p>
      <p className='full-width'>
        {exchangeRates && exchangeRates[currency] !== undefined
          ? (inverse ? (1 / exchangeRates[currency]).toFixed(6) : exchangeRates[currency].toFixed(6))
          : 'Loading...'
        }
      </p>
      <p className='full-width'>{currenciesInfo[currency]?.symbol || 'Loading...'} </p>
      <p className='full-width'>{currenciesInfo[currency]?.name || 'Loading...'}</p>
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

          <div className='d-flex'>
            <select
              className='choose-new'
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
            <button className='add-button' onClick={handleAddCurrency}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveRates;