const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const coinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  isSelected: { type: Boolean, default: false }
});

const Coin = mongoose.model('Coin', coinSchema);

async function setSelectedCoin(coinSymbol) {
  try {
    await Coin.updateMany({}, { isSelected: false });
    const result = await Coin.findOneAndUpdate({ symbol: coinSymbol }, { isSelected: true }, { new: true });
    
    if (!result) {
      throw new Error(`Coin with symbol ${coinSymbol} not found.`);
    }
    
    return result;
  } catch (error) {
    console.error('Error setting selected coin:', error);
    throw error;
  }
}

async function getSelectedDBConnections() {
  try {
    const selectedCoin = await Coin.findOne({ isSelected: true });
    
    if (!selectedCoin) {
      throw new Error("No selected coin found.");
    }
    
    return selectedCoin;
  } catch (error) {
    console.error('Error fetching selected coin:', error);
    throw error;
  }
}

module.exports = { setSelectedCoin, getSelectedCoin };