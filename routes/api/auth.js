const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

require('dotenv').config()
//User Model
const User = require('../../models/user');

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exists' })

            //Validate password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Password is wrong !!!'})
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
            })
        })        

});

router.get('/user',auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;