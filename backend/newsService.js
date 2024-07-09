require('dotenv').config();
const axios = require('axios');

const cache = {
  data: null,
  lastFetch: 0,
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
      const response = await axios.get(newsService.baseURL);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch news: HTTP status ${response.status}`);
      }
      cache.data = response.data;
      cache.lastFetch = now;
      console.log('Fetched new news data');
      return response.data;
    } catch (error) {
      console.error('Error fetching latest news:', error.message);
      if (cache.data) {
        console.log('Returning stale cached news data due to error');
        return cache.data;
      }
      // Rethrow or handle the error accordingly
      throw error;
    }
  },

  filterNewsByCoin: (news, coin) => {
    try {
      if (!news || typeof news !== 'object' || !Array.isArray(news.data) || news.data.length === 0) return [];
      const filteredNews = news.data.filter((article) =>
        article.title && article.title.toLowerCase().includes(coin.toLowerCase())
      );
      return filteredNews;
    } catch (error) {
       console.error('Error filtering news by coin:', error);
       // Depending on your error handling strategy, you might want to throw the error again or simply return an empty array/etc.
       // Here we choose to return an empty array to keep the function's contract but log the error for debugging.
       return [];
    }
  },
};

module.exports = newsService;