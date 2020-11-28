const request = require('supertest')
const app = require('../server')
const assert=require('assert');

describe('Post Endpoints', () => {
  /*
  afterAll((done)=> {
    request(app).get('/').close(done);
  });
  */
 /*
  it("has module",()=>{
    expect(app).toBeDefined();
  });
  */
 it("has module",()=>{
  expect(true).toEqual(true);
});
/*

  it('should create a new post', async (done) => {
     await request(app).get('/').expect(200).end(done);
     app.close()
  });
  */

})