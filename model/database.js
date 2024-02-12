const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/BLOG")
    .then(() => {
        console.log('connected to database successfully..')

    })
    .catch(() => {
        console.log('error while connecting to database.')
    })


const schema = new mongoose.Schema({
    
    blogText: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    url: {
        type: String

    }
})
const model =  mongoose.model("myblog", schema);

module.exports = model;