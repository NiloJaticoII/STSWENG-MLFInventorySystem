const request = require('supertest')
const app = require('../server')
const assert=require('assert');

describe('Post Endpoints', () => {

  afterAll((done)=> {
    request(app).get('/').close(done);
  });

  it("has module",()=>{
    expect(app).toBeDefined();
  });


  it('should create a new post', async (done) => {
     request(app).get('/').expect(200).end(done);
     
  });
  

})