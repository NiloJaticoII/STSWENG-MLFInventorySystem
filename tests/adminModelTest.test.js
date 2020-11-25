var mongoose = require("mongoose");
var mongo = require('mongodb');
var mongoDB = "mongodb://localhost:27017/MalateLiteraryFolio";
mongoose.connect(mongoDB);
const Admin=require("../models/AdminModel");


describe("admin test",()=>{
  beforeAll(async()=> {
    await Admin.remove({});
  });

  afterEach(async ()=>{
    await Admin.remove({});
  });

  afterAll(async()=>{
    await mongoose.connection.close();
  });

  it("has module",()=>{
    expect(Admin).toBeDefined();
  }

  );

  describe("get admin",()=>{
    it("get an admin",async ()=>{
      ObjectID = mongo.ObjectID;
      const user=new Admin ({"_id": new ObjectID(),userName: "hello",password:"world"});
      await user.save();

      const finduser=await Admin.findOne({userName:"hello"});
      const expected="hello";
      const actual=finduser.userName;
      expect(actual).toEqual(expected);
    });
  });

  describe("save admin",()=>{
    it("save an admin",async()=>{
      const user=new Admin({"_id": new ObjectID(),userName: "hello",password:"world"});
      const savedUser=await user.save();
      const expected="hello";
      const actual=savedUser.userName;
      expect(actual).toEqual(expected);
    });
  });

  describe("update admin",()=>{
    it("updates an admin",async ()=>{
      const user=new Admin({"_id": new ObjectID(),userName: "hello",password:"world"});
      await user.save();

      user.userName="again";
      const updatedUser=await user.save();

      const expected="again";
      const actual=updatedUser.userName;
      expect(actual).toEqual(expected);
    });
  });

});