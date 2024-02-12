const express = require('express')
const mongoose = require('mongoose');
require('../model/database');
const model = require('../model/database');
const router = express.Router();



router.get('/', (req, res) => {

    res.render('index');
})


module.exports = router;