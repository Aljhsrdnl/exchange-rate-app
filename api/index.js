const app = require('express')();
const axios = require('axios');
const router = require('./routes')

const call_external = (baseCurrency) => {
    const promise = axios.get(`https://www.currency-api.com/rates?base=${baseCurrency}`)
    const dataPromise = promise.then((response) => response.data)

    return dataPromise;
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use("/api", router);




module.exports = app;