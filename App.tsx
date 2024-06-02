import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import CoinSelector from './CoinSelector';

interface INews {
  id: number;
  title: string;
  content: string;
}

interface INewsCache {
  [key: string]: INews[];
}

const MainComponent: React.FC = () => {
  const [newsCache, setNewsCache] = useState<INewsCache>({});
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    if (newsCache[selectedCoin]) {
      setNewsList(newsCache[selectedCoin]);
      return;
    }

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
      setNewsCache(prevCache => ({
        ...prevCache,
        [selectedCoin]: data
      }));
    } catch (error) {
      setError(`Failed to fetch news: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCoin]);

  const refreshNews = () => {
    setNewsCache(prevCache => {
      const newCache = { ...prevCache };
      delete newCache[selectedCoin];
      return newCache;
    });
    fetchNews();
  };

  return (
    <div>
      <h1>Binance News Monitor</h1>
      <CoinSelector 
        selectedCoin={selectedCoin} 
        setSelectedCoin={setSelectedCoin} 
      />
      <button onClick={refreshNews} disabled={isLoading}>
        Refresh News
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && <NewsList newsList={newsList} />}
    </div>
  );
};

export default MainComponent;