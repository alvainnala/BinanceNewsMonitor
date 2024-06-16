import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface CryptoSelectProps {
  onCoinSelect: (coin: string) => void;
}

const cryptocurrencies = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Ripple", value: "XRP" },
  { label: "Litecoin", value: "LTC" },
];

const CryptoSelect: React.FC<CryptoSelectProps> = ({ onCoinSelect }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] = useState(cryptocurrencies);

  // Uncomment and implement this to fetch crypto data or news
  /* useEffect(() => {
    async function fetchData() {
      // Your fetch logic here
    }
    fetchData();
  }, [selectedCoin]); */

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = cryptocurrencies.filter(crypto => crypto.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredCryptocurrencies(filtered);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCoinSelect(selectedCoin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="crypto-search">Search cryptocurrency:</label>
        <input id="crypto-search" type="text" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        <label htmlFor="crypto-select">Select a cryptocurrency:</label>
        <select id="crypto-select" value={selectedCoin} onChange={handleSelectChange}>
          <option value="">--Please choose an option--</option>
          {filteredCryptocurrencies.map((crypto) => (
            <option key={crypto.value} value={crypto.value}>
              {crypto.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Monitor</button>
    </form>
  );
};

export default CryptoSelect;