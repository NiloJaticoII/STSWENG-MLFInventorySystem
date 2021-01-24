const express = require('express');
const router = express();

const adminAddController = require('../controllers/adminAddController');
const adminEditController = require('../controllers/adminEditController');
const adminDeleteController = require('../controllers/adminDeleteController');

//get admin page
router.get('/getHome', adminAddController.getLoginAdmin);
router.get('/getArtist', adminEditController.getArtist);
router.get('/getItems', adminEditController.getItems);
router.get('/getBundles', adminEditController.getBundles);
router.get('/getEvent', adminEditController.getEvent);
router.get('/getCurrEvent', adminEditController.getCurrEvent);
router.get('/getItemsProp', adminEditController.getItemsProp);
router.get('/getBundlesProp', adminEditController.getBundlesProp);

/*Add functions*/
//adds artist to database
router.post('/addArtist', adminAddController.postAddArtist);
//adds item to database
router.post('/addItem', adminAddController.postAddItem);
//adds bundle to database
router.post('/addBundle', adminAddController.postAddBundle);
//add event to database
router.post('/addEvent', adminAddController.postAddEvent);

/*Edit functions*/
//edit artist
router.post('/editArtist/', adminEditController.postEditArtist);
//edit item
router.post('/editItem', adminEditController.postEditItem);
//edit bundle
router.post('/editBundle', adminEditController.postEditBundle);
//edit event
router.post('/editEvent', adminEditController.postEditEvent);

/*Delete functions*/
//remove artist (this also removes all items and bundles associated with the artist)
router.post('/deleteArtist', adminDeleteController.postRemoveArtist);
//remove item
router.post('/deleteItem', adminDeleteController.postRemoveItem);
//remove bundle
router.post('/deleteBundle', adminDeleteController.postRemoveBundle);
//remove event
router.post('/deleteEvent', adminDeleteController.postRemoveEvent);
module.exports = router;