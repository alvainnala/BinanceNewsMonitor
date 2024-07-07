require('dotenv').config();
const axios = require('axios');

const cache = {
  data: null,
  lastFetch: 0
};

const cacheTimeout = 5 * 60 * 1000; // Cache timeout in milliseconds (5 minutes)

const newsService = {
  baseURL: process.env.BINANCE_NEWS_URL || 'https://www.binance.com/en/support/announcement/c-48',

  fetchLatestNews: async () => {
    const now = new Date().getTime();

    if (cache.data && (now - cache.lastFetch < cacheTimeout)) {
      console.log('Returning cached news data');
      return cache.data;
    }

    try {
      const response = await axios.get(`${newsService.baseURL}`);
      cache.data = response.data;
      cache.lastFetch = now;
      console.log('Fetched new news data');
      return response.data;
    } catch (error) {
      console.error('Error fetching latest news:', error);
      if (cache.data) {
        console.log('Returning stale cached news data due to error');
        return cache.data;
      }
      return null;
    }
  },

  filterNewsByCoin: (news, coin) => {
    if (!news || typeof news !== 'object' || !news.hasOwnProperty('data') || news.data.length === 0) return [];
    const filteredNews = news.data.filter((article) =>
      article.title && article.title.toLowerCase().includes(coin.toLowerCase())
    );
    return filtered,News;
  }
};

module.exports = newsService;