const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios")
require('dotenv').config();

const app = express();



app.get("/", (req, res) => {
    axios.get(`https://www.currency-api.com/rates`)
        .then(res.set('Access-Control-Allow-Origin', '*'))
        .then(res.send(res.json()))
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})