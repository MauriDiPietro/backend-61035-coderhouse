import "dotenv/config";

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/coderhouse',
};
