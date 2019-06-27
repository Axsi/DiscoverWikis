const env = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(process.env.LOCAL_PORT || 8100, ()=>{
    console.log('Server running on http://localhost:8100/');
});