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

  useEffect(() => {
    const fetchNews = async () => {
      const API_KEY = process.env.REACT_APP_BINANCE_API_KEY;
      const url = `https://api.binance.com/api/v3/news?coin=${selectedCoin}&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews&M#List(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [selectedCoin]); 

  return (
    <div>
      <h1>Binance News Monitor</h1>
      <CoinSelector selectedCoin={selected</Coin&>electedCoin} />
      <NewsList newsList={newsList} />
    </div>
  );
};

export default Main$&ponent;