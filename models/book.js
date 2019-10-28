const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BookSchema = new Schema({
    book_id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    newprice:{
        type:Number,
        required:true
    },
    oldprice:{
        type:Number,
        required:true
    },
    percentdis:{
        type:Number,
        required:true
    },
    quantitysell:{
        type:Number,
        required:true
    }
});

module.exports = Book = mongoose.model('books',BookSchema);