import '../Styles/LiveRates.css';
import { useEffect, useState } from 'react';

function LiveRates() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [currencies, setCurrencies] = useState(['CAD', 'USD', 'RUB', 'HKD']);

  const handleDelete = (currency) => {
    setRowsToDelete((prevRows) => [...prevRows, currency]);
    setCurrencies((prevCurrencies) => prevCurrencies.filter((curr) => curr !== currency));
  };

  const handleDone = () => {
    setRowsToDelete([]);
    setShowDeleteButton(false);
  };

  useEffect(() => {
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_I5OEo7N2IbSLAV5DWY2HwGo0FD8MKF0JmGywYdv9&base_currency=${selectedCurrency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.data);
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  }, [selectedCurrency]);

  return (
    <>
      <div id="market">
        <div className="con" style={{ backgroundColor: 'red' }}>
          <h2 className="text-center">Xe Live Exchange Rates</h2>

          <div className="table">
            <div className="table-row">
              <div className="checkbox-container">
                Inverse
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <p>Amount</p>
              <p>Change (24h)</p>
              <button className="Table-edit" onClick={showDeleteButton ? handleDone : setShowDeleteButton}>
                {showDeleteButton ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* Existing row */}
            <div className="table-row select-table">
              <p>EUR</p>
              <p>1</p>
              <p></p>
              <p></p>
            </div>

            {/* New rows from API */}
            {currencies.map((currency) => (
              !rowsToDelete.includes(currency) && (
                <div className="table-row" key={currency}>
                  <p>{currency}</p>
                  <p>{exchangeRates[currency]}</p>
                  <p></p>
                  <button
                    className={`${showDeleteButton ? 'delete-button' : 'hidden-button'}`}
                    onClick={() => handleDelete(currency)}
                  >
                    -
                  </button>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveRates;
