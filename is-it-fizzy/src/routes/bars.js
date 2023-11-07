const express = require('express');
const router = express.Router();
let Bar = require('../models/bar.model');


//get all bars
router.route('/').get((req, res) => {
    Bar.find()
    .then(bars => res.json(bars))
    .catch(err => res.status(400).json('Error!: '+ err))
});

// Endpoint to handle adding or updating a bar with a user's review
//add functionality to find the bar that the user searched for, if not in DB add it with rating

//if bar already in DB, push new rating to rating array
router.route('/add').post((req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const placeId = req.body.place_id;
    const ratings = req.body.fizzyRating;

//check if the bar already exists in the database
    
    Bar.findOne({placeId})
        .then(existingBar => {
            if(existingBar) {
                existingBar.ratings.push(ratings);
                existingBar.save()
                    .then(() => res.json('Bar added!'))
                    .catch(err => res.status(400).json('Error:' + err));
            } else {
                const newBar = new Bar({
                    name, 
                    placeId, 
                    ratings: [ratings]
                });
                newBar.save()
                    .then(() => res.json('Bar added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }      
        })
    });    

router.route('/:placeId').get((req, res) =>{
    Bar.findById(req.params.placeId)
        .then(bar => res.json(bar))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;
