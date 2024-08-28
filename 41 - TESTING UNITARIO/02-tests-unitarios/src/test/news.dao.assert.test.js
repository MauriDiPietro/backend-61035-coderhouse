import assert from "assert";
// https://nodejs.org/api/assert.html
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";
import mongoose from "mongoose";
import { logger } from "../logs/news.logs.js";

const createNew = () => {
  return {
    title: "Titulo de la noticia",
    body: "cuerpo de la noticia........",
    author: "Juan Perez",
    image: ".........",
  };
};

describe("tests unitarios de dao news", () => {
  let newsDao = null;
  let obj = createNew();
  before(async () => {
    newsDao = new DaoMongo();
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
    logger.info("se limpio la base de datos");
  });

  after(() => {
    logger.info("finalizaron las pruebas");
  });

  it("deberia retornar todas las noticias de la coleccion", async () => {
    const news = await newsDao.getAllNews();
    assert.equal(Array.isArray(news), true);
    assert.equal(news.length === 0, true);
  });

  it("deberia registrar una noticia a la coleccion news", async () => {
    const response = await newsDao.createNew(obj);
    const news = await newsDao.getAllNews();
    assert.ok(response._id); //fail
    assert.equal(response.title, obj.title);
    assert.equal(typeof response.body === "string", true);
    assert.equal(news.length, 1); //OJO
  });

  it("deberia encontrar un doc por id", async () => {
    const response = await newsDao.createNew(obj);
    const docNew = await newsDao.getNew(response._id);
    const responseId = response._id.toString();
    const responseGetId = docNew._id.toString();
    assert.equal(responseGetId, responseId);
  });
});
