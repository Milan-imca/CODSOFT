const mongoose = require('mongoose');

const connectMongo  = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connection success!`);
  } catch (error) {
    console.log(`MonogoDB Connection Error ${error}`);
  }
}

module.exports = connectMongo;