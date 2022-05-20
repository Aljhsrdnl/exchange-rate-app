const express = require('express');
const router = express.Router();
const axios = require('axios')

const call_external = (baseCurrency) => {
    const promise = axios.get(`https://www.currency-api.com/rates?base=${baseCurrency}`)
    const dataPromise = promise.then((response) => response.data)

    return dataPromise;
}

router.get("/:currencyFrom", (req, res) => {
    const base_currency = req.params['currencyFrom']
    call_external(base_currency)
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})

module.exports = router;
