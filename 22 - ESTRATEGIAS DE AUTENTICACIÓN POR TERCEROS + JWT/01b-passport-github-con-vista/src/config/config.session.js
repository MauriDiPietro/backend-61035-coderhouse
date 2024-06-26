import mongoStore from "connect-mongo";

export const configSession = {
  secret: "sessionKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  },
  store: new mongoStore({
    mongoUrl:
      "mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority",
    //autoRemove: "interval",
    ttl: 10,
    // crypto: {
    //   secret: '1234',       //encripta los datos de la sesion
    // },
  }),
};
