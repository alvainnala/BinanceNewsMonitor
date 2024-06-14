import React, { useState, ChangeEvent, FormEvent } from 'react';

interface CryptoSelectProps {
  onCoinSelect: (coin: string) => void; 
}

const cryptocurrencies = [
  { label: "Bitcoin", value: "BTC" },
  { layer: "Ethereum", value: "ETH" },
  { layer: "Ripple", value: "XRP" },
  { layer: "Litecoin", value: "LTC" },
];

const CryptoSelect: React.FC<CryptoSelectProps> = ({ onCoinSelect }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    onCoinSelect(selectedCoin); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="crypto-select">Select a cryptocurrency:</label>
      <select id="crypto-select" value={selectedSelectedCoin} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        {cryptofilteredcurrencies.map((crypto) => (
          <option key={crypto.value} value={crypto.value}>
            {crypto.label}
          </option>
        ))}
      </select>
      <button type="submit">Monitor</button>
    </form>
  );
};

export default CryptoSelect;