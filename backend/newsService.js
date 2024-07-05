require('dotenv').config();
const axios = require('axios');

const newsService = {
  baseURL: process.env.BINANCE_NEWS_URL || 'https://www.binance.com/en/support/announcement/c-48',

  fetchLatestNews: async () => {
    try {
      const response = await axios.get(`${newsService.baseURL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest news:', error);
      return null;
    }
  },

  filterNewsByCoin: (news, coin) => {
    if (!news || news.length === 0) return [];
    const filteredNews = news.filter((article) =>
      article.title.toLowerCase().includes(coin.toLowerCase()),
    );