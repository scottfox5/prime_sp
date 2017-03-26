// var express = require('express');
// var router = express.Router();
// var UserJournal = require('../../models/user');
//
// router.get('/', function (req, res) {
//
//   UserJournal.find({"_id" : req.user._id}, function (err, data) {
//     if (data.length == 0){
//       res.sendStatus(500)
//       return
//     } else {
//       console.log('User Data:', data)
//       var journalData = data[0].journal;
//
//       // converting park propery of array of journal entry objects into array of parks
//       var parksArray = journalData.map(function(item) { return item["park"]; });
//       parksArray.sort();
//       console.log('Parks Array:', parksArray)
//       // counting number of each item in parks array and converting to two arrays: one of distinct parks, one of number of visits to each park
//       var  count = {};
//       parksArray.forEach(function(i) { count[i] = (count[i]||0)+1;  }); // converts array of items to object with distinct item and number of occurences in array
//       console.log('List of unique parks and total visits:', count)
//       var parksVisited = Object.keys(count); // puts keys into array
//       var parkVisits = Object.values(count); // puts values into array
//
//       // converting two arrays into array of objects with properties of parks and visits
//       var checklist = parksVisited.map(function(e,i){return{park:e,visits:parkVisits[i]}});
//       console.log('Checklist Array of Objects w/ park/visits:', checklist)
//       res.send(checklist);
//       return
//     }
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//
//   }); // end of UserJournal.find
//
// }); // end of get
//
//
// module.exports = router;



var express = require('express');
var router = express.Router();
var UserJournal = require('../../models/user');

router.get('/', function (req, res) {

  UserJournal.find({"_id" : req.user._id}, function (err, data) {
    console.log('User Data:', data)
    var journalData = data[0].journal;
    console.log('Journal Data:', journalData);
    // converting park propery of array of journal entry objects into array of parks
    var parksArray = journalData.map(function(item) { return item["park"]; });
    console.log("Parks Array1:", parksArray);
    parksArray.sort();
    console.log("Parks Array2:", parksArray);


    // counting number of each item in parks array and converting to two arrays: one of distinct parks, one of number of visits to each park
    var  count = {};
    parksArray.forEach(function(i) { count[i] = (count[i]||0)+1;  }); // converts array of items to object with distinct item and number of occurences in array
    console.log('List of unique parks and total visits:', count);

    var countDuplicate = count;
    console.log("Count Duplicate:", countDuplicate)

    var parksVisited = Object.keys(count); // puts keys into array
    console.log("Parks Visited:", parksVisited);

    var parkVisits = Object.values(countDuplicate); // puts values into array
    console.log("Park Visits:", parkVisits);

    // converting two arrays into array of objects with properties of parks and visits
    var checklist = parksVisited.map(function(e,i){return{park:e,visits:parkVisits[i]}});
    console.log("Checklist:", checklist);

    if (err) {

      res.sendStatus(500);
      return;
    }
    console.log('Checklist Array of Objects w/ park/visits:', checklist);
    res.send(checklist);

  }); // end of UserJournal.find


}); // end of get


module.exports = router;
