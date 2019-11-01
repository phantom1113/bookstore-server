const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const config = require('config');
const jwt = require('jsonwebtoken');
const uniqueString = require('unique-string');
const middleware = require('../../middleware/auth');

require('dotenv').config()
//User Model
const User = require('../../models/user');


//Register user
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' })
            
            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user._id },
                                process.env.jwtSecret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            _id: user._id,
                                            name: user.name,
                                            email: user.email,
                                            cart: user.cart
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        })
        .catch(err => console.log(err));

});

//Update item in cart
router.post('/:id/cart',(req, res) => {
    let { cart } = req.body;
    User.findById(req.params.id,(err,doc) =>{
        if(err) return err;
        doc.cart = cart;
        doc.save();
    })
    .then(res.status(200).json({msg: 'Sucess'} ))
});

//Change password of user
router.post('/:id/user',(req,res) => {
    const { oldpassword, newpassword } = req.body;
    User.findById(req.params.id,(err,doc) =>{
        bcrypt.compare(oldpassword, doc.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Password is wrong !!!'});
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpassword, salt, (err, hash) => {
                    if (err) throw err;
                    doc.password = hash;
                    doc.save();
                });
            });
            return res.status(200).json({user:doc} )
        })
    })
});

//Get cart of user
router.get('/:id/cart',(req, res) => {
    User.findById(req.params.id)
        .then(doc => res.status(200).json(doc.cart))
});

//Check out cart
router.post('/:id/checkout', (req,res) => {
    const { item, address, method_payment, sumprice } = req.body;
    const checkout_id = uniqueString();
    User.findById(req.params.id)
        .then(doc => {
            doc.checkout_cart.push({ checkout_id,item,address,method_payment, sumprice, status:"Đang xử lí"});
            //console.log(doc.cart);
            doc.cart = [];
            doc.save();
            return res.status(200).json(doc);
        })
        .catch(err => res.status(404).json({ msg: 'Fail' }))
});

//Get history item was bought
router.get('/:id/historyitem', (req,res) => {

});

module.exports = router;