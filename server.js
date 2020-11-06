// dependency import
const express = require('express');
const parser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// controllers' import
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// declarations and middleware
const app = express();
app.use(parser.json());
app.use(cors());

// initialization of the database knex'ion
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: false
  	}
  }
});

// read the envionmental variables to look for port. Don't forget to set it first.
const PORT = process.env.PORT;

// server services
app.get("/", (req, res) => res.json("success"));

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT || 3000, () => console.log(`Server is working on port ${PORT}`));