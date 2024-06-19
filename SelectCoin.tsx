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

interface CryptoNews {
  title: string;
  content: string;
}

async function fetchCryptoNews(coin: string): Promise<CryptoNews> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const news: CryptoNews = {
    title: `Latest News on ${coin}`,
    content: `The market is seeing an unprecedented move in ${coin}. Analysts are speechless.`,
  };
  
  return news;
}

const CryptoSelect: React.FC<CryptoSelectProps> = ({ onCoinSelect }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] = useState(cryptocurrencies);
  const [cryptoNews, setCryptoNews] = useState<CryptoNews | null>(null);

  useEffect(() => {
    if (selectedCoin) {
      fetchCryptoNews(selectedCoin)
        .then(news => {
          setCryptoNews(news);
          onCoinSelect(selectedCoin); 
        })
        .catch(error => console.error(error));
    }
  }, [selectedCoin, onCoinSelect]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value);
    setCryptoNews(null); 
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = cryptocurrencies.filter(crypto => 
      crypto.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredCryptocurrencies(filtered);
  };

  const handleSubmit = (event: FormFormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCoinSelect(selectedCoin);
  };

  return (
    <>
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
      {cryptoNews && (
        <div>
          <h2>{cryptoNews.title}</h2>
          <p>{cryptoNews.content}</p>
        </div>
      )}
    </>
  );
};

export default CryptoSelect;