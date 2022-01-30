const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");


require('dotenv').config();


//const variable define
const port = process.env.PORT || 9001;
const connUri = process.env.MONGO_URL;


//starting of app
const app = express();

//for cors origin platform
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization', 'host']
}));

// for parsing application/json
app.use(express.json());
// for parsing application/x www-
app.use(express.urlencoded({ extended: false }));

mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   console.log('connected');
});

const connection = mongoose.connection;
connection.on('error', (err) => {
   console.log(err);
   process.exit();
});

//Middleware
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//configureRoute
require('./routes/index')(app);

app.listen(port, () => console.log(`port is running ${port}`));