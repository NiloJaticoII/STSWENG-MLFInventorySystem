const request = require('supertest')
const app = require('../server')
const assert=require('assert');
const mongoose = require('mongoose')

beforeAll(async () => {
  const url = 'mongodb://Admin:Malate123456@inventory-system-shard-00-00.3chzt.mongodb.net:27017,inventory-system-shard-00-01.3chzt.mongodb.net:27017,inventory-system-shard-00-02.3chzt.mongodb.net:27017/MalateLiteraryFolio?ssl=true&replicaSet=atlas-bhky5u-shard-0&authSource=admin&retryWrites=true&w=majority'
  await mongoose.connect(url, { useNewUrlParser: true })
})

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