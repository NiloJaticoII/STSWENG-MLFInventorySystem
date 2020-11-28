const request = require('supertest')
const app = require('../router/adminRoutes')
const assert=require('assert');

describe('Post Endpoints', () => {
  /*
  afterAll((done)=> {
    request(app).close(done);
  });*/

  it("has module",()=>{
    expect(app).toBeDefined();
  });
  /*
  describe('admin route get routes',()=>{
    it('should create a new post', async (done) => {
      request(app).get('/admin').expect(500).end(done);
      
    });

  });*/
  
})