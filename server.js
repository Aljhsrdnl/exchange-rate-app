const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios")
require('dotenv').config();
const request = require("request")


const app = express();

const call_external = (callback, baseCurrency) => {
    console.log(baseCurrency)
    request(`https://www.currency-api.com/rates?base=${baseCurrency}`,
    {json: true},
            (err, res, body) => { 
                if (err) {
                    callback(err)
                }
                return callback(body)
            }   

    )
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/:currencyFrom", (req, res) => {
    // call_external(r => {
    //     res.send(r)
    // })

    const base_currency = req.params['currencyFrom']
    console.log(base_currency)
    call_external((r, base_currency) => {
        console.log(`Base Currency: ${base_currency}`)
        res.send(r)
    })

    // res.send(base_currency)
})

// app.get("/:currencyFrom", (req, res) => {
//     const dataStream = got.stream({
//         uri: `https://www.currency-api.com/rates`,
//     })

//     pipeline(dataStream, res, (err) => {
//         if (err) {
//             console.log(err)
//             res.sendStatus(500);
//         }
//     })
// })

app.listen(8080, () => {
    console.log('listening on port 8080')
})