const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Tweb"
mongoose.Promise = global.Promise;
connection = mongoose.connect(url, {family:4})
    .then(() => {
        console.log('connection to MongoDB worked');
    })
    .catch((error) => {
        console.log('connection to MongoDB did not work ' + JSON.stringify(error));
    });