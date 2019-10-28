const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            cart_id : {type:String, require:true, unique:true},
            quantity:{
                type: Number,
                required: true,
                default:1
            },
            item:{
                type:Object,
            },
        },
    ],
    date: {
        type:Date,
        default: Date.now    
    },
    checkout_cart: [
        {
            checkout_id : {type:String, require:true, unique:true},
            type:Object,
            item: [],
            address: {
                type:String,
                require:true
            },
            method_payment: {
                type:String,
                require:true
            },
            sumprice: {
                type: Number,
                required: true
            },
            status:{
                type:String,
                require:true,
                default: "Đang chờ xử lí"
            },
        }
    ]
});

module.exports = User = mongoose.model('users',UserSchema);