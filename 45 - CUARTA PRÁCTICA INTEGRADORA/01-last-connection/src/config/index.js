import 'dotenv/config'

export default {
  PORT: process.env.PORT,
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
  SECRET_KEY: process.env.SECRET_KEY,
  PERSISTENCE: process.env.PERSISTENCE,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  PASS_ADMIN: process.env.PASS_ADMIN,
  ENV: process.env.ENV,
  SECRET_COOKIES: process.env.SECRET_COOKIES,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
