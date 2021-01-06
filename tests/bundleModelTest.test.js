var mongoose = require("mongoose");
var mongo = require('mongodb');
var mongoDB = "mongodb://localhost:27017/MalateLiteraryFolio";
mongoose.connect(mongoDB);
const Bundle=require("../models/BundleModel");


describe("bundle test",()=>{
  beforeAll(async()=> {
    await Bundle.remove({});
  });

  afterEach(async ()=>{
    await Bundle.remove({});
  });

  afterAll(async()=>{
    await mongoose.connection.close();
  });

  it("has module",()=>{
    expect(Bundle).toBeDefined();
  }

  );

  describe("get bundle",()=>{
    it("get an bundle",async ()=>{
      ObjectID = mongo.ObjectID;
      const user=new Bundle ({"_id": new ObjectID(),artistID: 12345678,eventID:new ObjectID(),includedItems:[new ObjectID()],bundleName:"b1",bundlePrice:"99.99",bundleSold:"1",bundleStock:"1",bundlePicture:"b1pic"});
      await user.save();

      const finduser=await Bundle.findOne({bundleName:"b1"});
      const expected="b1";
      const actual=finduser.bundleName;
      expect(actual).toEqual(expected);
    });
  });

  describe("save bundle",()=>{
    it("save a bundle",async()=>{
      const user=new Bundle ({"_id": new ObjectID(),artistID: 12345678,eventID:new ObjectID(),includedItems:[new ObjectID()],bundleName:"b1",bundlePrice:"99.99",bundleSold:"1",bundleStock:"1",bundlePicture:"b1pic"});
      const savedUser=await user.save();
      const expected="b1";
      const actual=savedUser.bundleName;
      expect(actual).toEqual(expected);
    });
  });

  describe("update bundle",()=>{
    it("updates a bundle",async ()=>{
      const user=new Bundle ({"_id": new ObjectID(),artistID: 12345678,eventID:new ObjectID(),includedItems:[new ObjectID()],bundleName:"b1",bundlePrice:"99.99",bundleSold:"1",bundleStock:"1",bundlePicture:"b1pic"});
      await user.save();

      user.bundleName="b1ed";
      const updatedUser=await user.save();

      const expected="b1ed";
      const actual=updatedUser.bundleName;
      expect(actual).toEqual(expected);
    });
  });

});