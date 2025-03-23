const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const PORT = 2024;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/public', express.static('public'));



app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

// app.get('/play',(req, res)=>{
//     res.sendFile(__dirname + '/public/play.html')
// })
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'))
});

app.post('/play', (req, res) => {
  const userName = req.body.name;
  if (userName) {
    // console.log('User name received:', userName);
    // you can save the name here, and use it in the next page.
    res.send({redirect: `/game.html?name=${encodeURIComponent(userName)}`});
  } else {
    res.status(400).send('Name not provided.');
  }
});

app.post('/press',(req,res)=>{
    
})


// Start server
app.listen( process.env.PORT || PORT, ()=>{
    console.log(`Server connected on ${PORT}`)
})