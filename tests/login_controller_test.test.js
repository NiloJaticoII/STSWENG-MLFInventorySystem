const Controller=require("../controllers/loginController");
const {getLoginPage}=require("../controllers/loginController");
const sinon=require("sinon");
const ItemModel = require("../models/ItemModel");

describe("login controller test",()=>{
  it("has a module",async ()=>{
    expect(Controller).toBeDefined();
  });

});