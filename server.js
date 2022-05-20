const express = require("express");
const axios = require("axios")


const app = express();



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/:currencyFrom", (req, res) => {
    const base_currency = req.params['currencyFrom']
    call_external(base_currency)
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})




app.listen(8080, () => {
    console.log('listening on port 8080')
})