//https://nodejs.org/api/test.html
import { describe, test, before } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";
import mongoose from "mongoose";
import { logger } from "../logs/news.logs.js";


const newsDao = new DaoMongo();
const mockNews = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe('conjunto de pruebas dao news', () => {
  before(async () => {
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
    logger.info("se limpio la base de datos");
  });

  test('deberia retornar todas las noticias de la coleccion', async()=>{
    const news = await newsDao.getAllNews();
    assert.equal(Array.isArray(news), true);    //=
    assert.deepEqual(news.length, 0)            //==
    assert.deepStrictEqual(news, []);           //===
    assert.notEqual(news, {});
    assert.doesNotThrow(() => news);
  });

  test('deberia registrar una noticia', async()=>{
    const body = mockNews();
    const response = await newsDao.createNew(body);
    const news = await newsDao.getAllNews();
    assert.ok(response, '_id');
    assert.deepStrictEqual(response.title, body.title);
    assert.equal(news.length, 1);
  })
});
