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

router.get('/pagination', (req,res) => {
    let filter = {};
    let page = parseInt(req.query.page) || 1;
    filter.category = req.query.category
    let perPage = 1;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    console.log(req.query.category,page);
    Book.find({filter})
    .sort()
    .then( items => {
        console.log(items);
        res.json(items.slice(start,end))
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

module.exports = router;