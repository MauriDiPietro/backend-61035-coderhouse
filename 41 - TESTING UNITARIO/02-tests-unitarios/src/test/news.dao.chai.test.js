import DaoMongo from '../persistence/DAOS/mongo/news.mongo.dao.js';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { logger } from '../logs/news.logs.js';

const createNew = () => {
    return {
        title: 'Titulo de la noticia',
        body: 'cuerpo de la noticia........',
        author: 'Juan Perez',
        image: '.........'
    }
};

describe('tests unitarios de dao news', ()=>{
    let newsDao = null;
    let obj = createNew();
    before(async()=>{
        newsDao = new DaoMongo();
        DaoMongo.init();
        await mongoose.connection.collections['news'].drop();
        logger.info('se limpio la base de datos')
    });

    after(()=>{
        logger.info('finalizaron las pruebas')
    });

    it('deberia retornar todas las noticias de la coleccion', async()=>{
        const news = await newsDao.getAllNews();
        expect(Array.isArray(news)).to.be.equal(true);
        expect(news.length === 0).to.be.equal(true);
        expect(news).to.have.length(0);
    })

    it('deberia registrar una noticia a la coleccion news', async()=>{
        const response = await newsDao.createNew(obj);
        const news = await newsDao.getAllNews();
        expect(response).to.have.property('_id');
        expect(response.title).to.be.equal(obj.title);
        // expect(typeof response.body === 'string').to.be.equal(true);
        expect(response.body).to.be.a('string');
        expect(news).to.have.length(1); //OJO
    });

    it('deberia encontrar un doc por id', async()=>{
        const response = await newsDao.createNew(obj);
        const docNew = await newsDao.getNew(response._id);
        const responseId = response._id.toString();
        const responseGetId = docNew._id.toString();
        expect(responseGetId).to.equal(responseId);
    })

})