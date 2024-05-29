import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import CoinSelector from './CoinSelector';

interface INews {
  id: number;
  title: string;
  content: string;
}

const MainComponent: React.FC = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch news from the Binance API
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    const API_KEY = process.env.REACT_APP_BINANCE_API_KEY;
    const url = `https://api.binance.com/api/v3/news?coin=${selectedCoin}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      setError("Failed to fetch news: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect hook to fetch news when the selectedCoin changes or on component mount
  useEffect(() => {
    fetchNews();
  }, [selectedCoin]);

  const refreshNews = () => {
    fetchNews();
  };

  return (
    <div>
      <h1>Binance News Monitor</h1>
      <CoinSelector selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
      <button onClick={refreshNews} disabled={isLoading}>Refresh News</button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && <NewsList newsList={newsList} />}
    </div>
  );
};

export default MainComponent;