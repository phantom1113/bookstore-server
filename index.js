const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const config = require('config');
const Books = require('./routes/api/books');
const Users = require('./routes/api/users');
const Auth = require('./routes/api/auth');
const middleware = require('./middleware/auth');
require('dotenv').config()


const app = express();

app.use(cors());
app.use(express.json());

//DB config
//const db = config.get('mongoURL');

//Connect to MongoDb
mongoose
    .connect(process.env.mongoURL,{
        useNewUrlParser:true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/books',Books);
app.use('/api/users',Users);
app.use('/api/auth',Auth);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));