const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/database');
const model = require('../model/database')

router.get('/', async (req, res) => {

    const Request = await model.find({}).sort({_id: -1});
    res.json(Request);
})

module.exports  = router;