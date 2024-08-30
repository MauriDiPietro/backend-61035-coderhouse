import app from '../../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';
import { logger } from '../../logs/news.logs.js';

const mockNews = () => {
    return {
      title: faker.lorem.lines(1),
      body: faker.lorem.lines({ min: 1, max: 5 }),
      author: faker.person.fullName(),
      image: faker.image.url(),
    };
  };

describe('Conjunto de pruebas de API NEWS', ()=>{
    beforeAll(async () => {
        await mongoose.connection.collections["news"].drop();
        logger.info("se limpio la base de datos");
      });

      test('[POST] /news', async()=>{
        const body = mockNews();
        const response = await request(app).post('/news').send(body);
        // console.log(response.body);
        const id = response.body._id;
        const titleResponse = response.body.title;
        const titleExpected = body.title;
        const statusCode = response.statusCode;
        expect(id).toBeDefined();
        expect(response.body).toHaveProperty('_id');
        expect(titleResponse).toBe(titleExpected); 
        expect(titleResponse).toEqual(titleExpected);    
        expect(statusCode).toBe(200)
      });

      test('[GET] /news', async()=>{
        const response = await request(app).get('/news');
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body).toBeInstanceOf(Array);
        const dateNews = response.body[0].date;
        // console.log(new Date().getFullYear())
        const dateExpected = expect.stringContaining(new Date().getFullYear().toString());
        expect(dateNews).toEqual(dateExpected);
      });

      test('[GET] /news/:id', async()=>{
        const body = mockNews();
        const response = await request(app).post('/news').send(body);
        const { _id } = response.body;
        const responseGetById = await request(app).get(`/news/${_id}`);
        expect(responseGetById.statusCode).toBe(200);
/* ------------------------------------ - ----------------------------------- */
        const idFalse = '507f191e810c19729de860ea';
        const responseGetByIdNotFound = await request(app).get(`/news/${idFalse}`);
        const msgNotFound = `No se encontró el id ${idFalse} en la base de datos.`
        expect(responseGetByIdNotFound.statusCode).toBe(404);
        expect(responseGetByIdNotFound.body.msg).toEqual(msgNotFound);
      })

      afterAll(async()=>{
        await mongoose.disconnect();
      })
})