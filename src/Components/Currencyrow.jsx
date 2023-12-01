const CurrencyRow = ({ currencyNames, exchangeRates, selectedCurrency, setSelectedCurrency, inputValue, setInputValue }) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type='number'
        className='input'
        value={inputValue}
        onChange={handleInputChange}
      />
      <select
        name='currency'
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {currencyNames.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;