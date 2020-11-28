const request = require('supertest')
const app = require('../router/adminRoutes')
const assert=require('assert');
var http = require('http');

const server=new http.Server(app)
server.listen(1337)


describe('Post Endpoints', () => {
  
  afterAll(()=> {
    server.close();
  });

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