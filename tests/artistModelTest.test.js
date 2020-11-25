var mongoose = require("mongoose");
var mongo = require('mongodb');
var mongoDB = "mongodb://localhost:27017/MalateLiteraryFolio";
mongoose.connect(mongoDB);
const Artist=require("../models/ArtistModel");


describe("artist test",()=>{
  beforeAll(async()=> {
    await Artist.remove({});
  });

  afterEach(async ()=>{
    await Artist.remove({});
  });

  afterAll(async()=>{
    await mongoose.connection.close();
  });

  it("has module",()=>{
    expect(Artist).toBeDefined();
  }

  );

  describe("get artist",()=>{
    it("get an artist",async ()=>{
      ObjectID = mongo.ObjectID;
      const user=new Artist ({"_id": new ObjectID(),artistID: 12345678,artistName:"world"});
      await user.save();

      const finduser=await Artist.findOne({artistID: 12345678});
      const expected=12345678;
      const actual=finduser.artistID;
      expect(actual).toEqual(expected);
    });
  });

  describe("save artist",()=>{
    it("save an artist",async()=>{
      const user=new Artist ({"_id": new ObjectID(),artistID: 12345678,artistName:"world"});
      const savedUser=await user.save();
      const expected=12345678;
      const actual=savedUser.artistID;
      expect(actual).toEqual(expected);
    });
  });

  describe("update artist",()=>{
    it("updates an artist",async ()=>{
      const user=new Artist ({"_id": new ObjectID(),artistID: 12345678,artistName:"world"});
      await user.save();

      user.artistID=91011123;
      const updatedUser=await user.save();

      const expected=91011123;
      const actual=updatedUser.artistID;
      expect(actual).toEqual(expected);
    });
  });

});