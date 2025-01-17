const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('../models/database.js');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const Artists = require('../models/ArtistModel.js');
const Items = require('../models/ItemModel.js');
const Bundles = require('../models/BundleModel.js');
const Events = require('../models/EventModel.js');
const Cashiers = require('../models/CashierModel.js');

const adminAddController = {
    //Render admin
    getLoginAdmin: function(req, res, next){
        //if logged in user is admin
        //if (req.session.isAdmin) {

            /* gets income of each artist */
            const getIncome = async function(artistID) {
                return new Promise(function (resolve, reject) {
                    db.findOne(Events, {isCurrentEvent: true}, '_id', function(event) {
                        eventResultID = new mongoose.Types.ObjectId();
                        if (event) {
                            eventResultID = event._id;
                        }
                        db.findMany(Items, {artistID: artistID, eventID: eventResultID}, 'itemsSold itemPrice', function (itemRes) {
                            var income = 0;

                            for (let j = 0; j < itemRes.length; j++) {
                                income += (itemRes[j].itemsSold * itemRes[j].itemPrice)
                            }

                            db.findMany(Bundles, {artistID: artistID, eventID: eventResultID}, 'bundleSold bundlePrice', function (bundleRes) {
                                for (let k = 0; k < bundleRes.length; k++) {
                                    income += (bundleRes[k].bundleSold * bundleRes[k].bundlePrice)
                                }

                                resolve(income.toFixed(2))
                            })
                        })
                    })
                })
            }

            /* renders admin page with details */
            const getDetails = async (artists, details) => {
                for (let i = 0; i < artists.length; i++) {
                    let income = 0;
                    artists[i].income = await getIncome(artists[i].artistID)
                }

                details.artist = artists
                res.send(details);
                //res.render('admin', details)
            };

            //Get current event, if no event then assign random id 
            //(Random ID doesnt affect the program since no items and bundles match this ID)
            eventResultID = new mongoose.Types.ObjectId();
            db.findOne(Events, {isCurrentEvent: true}, '_id', eventResult=>{
                if (eventResult) {
                    eventResultID = eventResult._id;
                }
                //find artist then render with details
                db.findMany(Artists, {}, '', result=>{
                    let artistArray = [];
                    let artistItemsArray = [];
                    let itemArray = [];
                    //push all artistID and artistName to an array to be used in details below
                    for (let i=0;i<result.length;i++){
                        artistObj = { //artist object containing artist ID and artist name
                            artistID: result[i].artistID,
                            artistName: result[i].artistName,
                        }
                        artistArray.push(artistObj);
                    }

                    db.findOne(Events, {isCurrentEvent: true}, '', eventResult=> {
                        if (eventResult) {
                            //push all items to an array to be used in details below
                            for (let i=0;i<result.length;i++){ //artist
                                db.findMany(Items,{artistID: result[i].artistID, eventID: eventResult._id},'', itemResult=>{ //returns item of artist
                                    itemArray = []; //empties the item array for the next set of items for artist
                                    for (let j=0;j<itemResult.length;j++){ //item
                                        itemObj = { //item object containing item info
                                            itemID: itemResult[j]._id,
                                            itemPicture: itemResult[j].itemPicture,
                                            itemName: itemResult[j].itemName,
                                            itemPrice: itemResult[j].itemPrice,
                                            stocksQuantity: itemResult[j].stockQuantity,
                                        }
                                        itemArray.push(itemObj); //array of item info
                                    }
                                    artistItemsObj = { //artist item object containing item info and artist ID
                                        artistID: result[i].artistID,
                                        item: itemArray,
                                    }
                                    artistItemsArray.push(artistItemsObj); //array of artist item (this is for artistItems in details)
                                })
                            }
                        }
                    })
                    //Set event count down for days, hours, minutes, and seconds
                    db.findOne(Events, {isCurrentEvent: true},'', eventResult=>{
                        if (eventResult) { //if theres an event make time to 00:00
                            eventResultID = eventResult._id;
                            if (eventResult.startDate < new Date) {
                                eventResult.endDate.setHours(0);
                                var diffDate = parseInt((eventResult.endDate - new Date));
                            }
                            else {
                                var diffDate = 0;
                            }
                        }
                        else {
                            var diffDate = 0;
                            eventResultID = new mongoose.Types.ObjectId();
                        }
                        var minutes = 0;
                        var seconds = 0;
                        var totalSeconds = 0;
                        if (diffDate >= 0) { //if there is time remaining
                            minutes = Math.floor(diffDate / (1000 * 60));
                            seconds = Math.floor(diffDate / (1000));
                            totalSeconds = seconds;
                        }
                        var hours = Math.floor(minutes / 60);
                        var days = Math.floor(hours/24);
                        hours = hours%24;
                        minutes = minutes%60;
                        seconds = seconds%60;
                        //find how many items were sold
                        db.findMany(Items, {eventID:eventResultID}, '', itemResult=>{
                            var sold=0;
                            for (let i=0; i<itemResult.length;i++) {
                                sold += itemResult[i].itemsSold;
                            }
                            db.findMany(Bundles, {eventID:eventResultID}, '', bundleResult=>{
                                for (let i=0;i<bundleResult.length;i++) {
                                    sold += bundleResult[i].bundleSold;
                                }
                                db.findMany(Events, {}, '', manyEventsResult=>{
                                    eventArray = [];
                                    for (let i=0;i<manyEventsResult.length;i++){
                                        eventObj = { //event object containing event info
                                            eventID: manyEventsResult[i]._id,
                                            eventName: manyEventsResult[i].eventName,
                                        }
                                        eventArray.push(eventObj); //array of item info
                                    }
                                    //details of admin page
                                    var details = {
                                        artist: artistArray,
                                        artistItems: artistItemsArray,
                                        daysLeft: days,
                                        hoursLeft: hours,
                                        minutesLeft: minutes,
                                        secondsLeft: seconds,
                                        totalSeconds: totalSeconds,
                                        totalSold: sold,
                                        event: eventArray,
                                    }

                                    getDetails(artistArray, details);
                                })
                            })
                        })
                    })     
                })

            })
            /*
        }
        // if the logged in user is not an admin, therefore a cashier
        else if (req.session.isAdmin == false) {
            res.redirect('/main')
        } 
        
        // if the user is not logged in
        else res.redirect('/')
        */
    },

    //Add artist to database
    postAddArtist: function(req, res, next){
        console.log(req.body);
        artistData = {
            _id: new mongoose.Types.ObjectId(),
            artistID: req.body.newArtistIDNo,
            artistName: req.body.newArtistName
        }
        cashierData = {
            _id: new mongoose.Types.ObjectId(),
            artistID: req.body.newArtistIDNo,
            password: req.body.newArtistPassword,
        }
        db.insertOne(Artists, artistData, result=>{
            if (result) {
                console.log("Successfully added artist to the artists collection");
            }
            else {
                console.log("Error adding artist to the artists collection");
            }
        });

        bcryptjs.hash(cashierData.password, saltRounds, function(err, hash) {
            cashierData.password = hash
            db.insertOne(Cashiers, cashierData, result=>{
                if (result) {
                    console.log("Successfully added cashier to the cashiers collection");
                }
                else {
                    console.log("Error adding cashier to the cashiers collection");
                }
            });
        })
        
        res.redirect('/admin');
    },

    //Add item to database
    postAddItem: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
          const upload = multer({
              storage: storage
          }).single('addItemPhotoPickerInput');

          upload(req, res, (err) => {
            console.log(err)
            if (!err){
                db.findOne(Events,{isCurrentEvent:true}, '', eventResult=>{
                    var eventResultID = new mongoose.Types.ObjectId();
                    if (eventResult) {
                        eventResultID = eventResult._id;
                    }
                    data = {
                        _id: new mongoose.Types.ObjectId(),
                        artistID: req.body.artistsListDropdownItemAdd,
                        eventID: eventResultID,
                        itemName: req.body.newItemName,
                        itemPrice: req.body.newItemPriceStock,
                        stockQuantity: req.body.newItemStockQuantity,
                        itemsSold: 0,
                        itemPicture: '/photo/'+ req.file.originalname,
                    }
                    
                    db.insertOne(Items, data, result=>{
                        if (result) {
                            console.log("Successfully added item to the items collection");
                        }
                        else {
                            console.log("Error adding item to the items collection");
                        }
                    });
                    
                    res.send('/admin');
                })
            }
        })
    },

    //Add bundle to database
    postAddBundle: function(req, res, next){
        //multer storage
        const storage = multer.diskStorage({
            destination: './public/photo/',
            filename: function(req, file, cb) {
              cb(null,file.originalname);
            }
          });
  
        const upload = multer({
            storage: storage
        }).single('addBundlePhotoPicker');

        upload(req, res, (err) => {
            if (!err){
                db.findOne(Events, {isCurrentEvent:true},'', eventResults=>{
                    var eventResultsID = new mongoose.Types.ObjectId();
                    if (eventResults) {
                        eventResultsID = eventResults._id;
                    }
                    data = {
                        _id: new mongoose.Types.ObjectId(),
                        artistID: req.body.artistsListDropdownBundleAdd,
                        eventID: eventResultsID,
                        includedItems: req.body.addSelectedItems,
                        bundleName: req.body.newBundleName,
                        bundlePrice: req.body.newBundlePriceStock,
                        bundleSold: 0,
                        bundleStock: req.body.newBundleStockQuantity,
                        bundlePicture: '/photo/'+ req.file.originalname,
                    }
                    
                    db.insertOne(Bundles, data, result=>{
                        if (result) {
                            console.log("Successfully added bundle to the bundles collection");
                        }
                        else {
                            console.log("Error adding bundle to the bundles collection");
                        }
                        res.redirect('/admin');
                    });
                })
            }
        })
    },

    //Add event to database
    postAddEvent: function(req, res, next){
        var isCurrEvent = true;
        if (req.body.addCurrentEvent == 1) {
            isCurrEvent = true;
        }
        else {
            isCurrEvent = false;
        }
        let eventData = {
            _id: new mongoose.Types.ObjectId(),
            eventName: req.body.newEventName,
            startDate: req.body.addStartEventDate,
            endDate: req.body.addEndEventDate,
            isCurrentEvent: isCurrEvent,
        }

        //If not set to current event then simply add. Else, update current event to false then set this event to current.
        if (!isCurrEvent) {
            db.insertOne(Events, eventData, result=>{
                if (result) {
                    console.log("Successfully added event to the artists collection");
                }
                else {
                    console.log("Error adding event to the artists collection");
                }
                res.redirect('/admin');
            });
        }
        else {
            db.updateOne(Events, {isCurrentEvent: true}, {isCurrentEvent: false}, result=>{
                db.insertOne(Events, eventData, result=>{
                    if (result) {
                        console.log("Successfully added event to the artists collection");
                    }
                    else {
                        console.log("Error adding event to the artists collection");
                    }
                    res.redirect('/admin');
                });
            });
        }
        
    },
    
    
}

module.exports = adminAddController;