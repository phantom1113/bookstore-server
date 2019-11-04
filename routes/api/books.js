const express = require('express');
const router = express.Router();
const _ = require('lodash');

//Book Model
const Book= require('../../models/book');

router.get('/', (req,res) => {
    let filter = {};
    if(req.query.category !== ''){
        filter.category = req.query.category
    }
    Book.find(filter)
    .sort()
    .then( items => {
        res.json(items)
    })
    .catch(err => console.log(err));
});

router.get('/search', (req,res) => {
    const regex = new RegExp(_.escapeRegExp(req.query.name),"i");
    Book.find({name: regex},null,function (err, docs){})
    .sort()
    .then( items => {
        res.json(items)
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req,res) => {
    Book.findById(req.params.id)
    .then( items => {
        res.json(items)
    })
    .catch(err => console.log(err));
});

router.get('/pageproduct', (req,res) => {
    Book.find()
    .sort()
    .then( items => {
        res.json(items)
    })
    .catch(err => console.log(err));
});

module.exports = router;