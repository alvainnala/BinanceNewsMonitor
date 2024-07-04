require('dotenv').config(); 
const axios = require('axios'); 

const newsService = {
    baseURL: process.env.BINANCE_NEWS_URL || "https://www.binance.com/en/support/announcement/c-48",

    fetchLatestNews: async function() {
        try {
            const response = await axios.get(`${this.baseURL}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching latest news:", error);
            return null;
        }
    },

    filterNewsByCoin: function(news, coin) {
        if (!news || news.length === 0) return [];
        const filteredNews = news.filter(article => article.title.toLowerCase().includes(coin.toLowerCase()));
        return filteredNews;
    }
};

module.exports = newsService;