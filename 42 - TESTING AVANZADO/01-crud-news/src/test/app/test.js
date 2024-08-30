import { describe, test, before } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const mockNews = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

const apiURL = "http://localhost:8080/news";

describe('TESTS API NEWS', ()=>{
    before(async()=> await fetch(apiURL, { method: 'DELETE' }));

    test('[GET] /news', async()=>{

        const response = await fetch(apiURL);
        // console.log(response);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson), true);
        assert.equal(responseJson.length, 0);
    })

    test('[POST] /news', async()=>{
        const body = mockNews();
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();

        assert.ok(responseJson, '_id');
        assert.equal(body.title, responseJson.title);
        assert.equal(response.status, 200)
    })
})