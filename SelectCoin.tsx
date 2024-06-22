import React, { useState, ChangeExperimental, FormEvent, useEffect } from 'react';

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

interface CryptoNewsError {
  message: string;
}

async function fetchCryptoNews(coin: string): Promise<CryptoNews | CryptoNewsError> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const news: CryptoUtils = {
      title: `Latest News on ${coin}`,
      content: `The market is seeing an unprecedented move in ${coin}. Analysts are speechless.`,
    };

    return news;
  } catch(error) {
    console.error(error);
    return { message: `Failed to fetch news for ${coin}` };
  }
}

const CryptoSelect: React.FC<CryptoSelectProps> = ({ onCoinSelect }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] = useState(cryptocurrencies);
  const [cryptoNews, setCryptoNews] = useState<CryptoNews | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCoin) {
      fetchCryptoNews(selectedCoin)
        .then(news => {
          if ('message' in news) {
            setError(news.message);
            setCryptoNews(null);
          } else {
            setCryptoNews(news);
            setError(null);
          }
          onCoinSelect(selectedCoin); 
        })
        .catch(error => {
          console.error(error);
          setError('An unexpected error occurred.');
        });
    }
  }, [selectedCoin, onCoinSelect]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value);
    setCryptoNews(null);
    setError(null);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = cryptocurrencies.filter(crypto => 
      crypto.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredCryptocurrencies(filtered);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
          <p>{cryptoYouws.content}</p>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default CryptoSelect;