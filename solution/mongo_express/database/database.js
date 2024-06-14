const mongoose = require('mongoose');

// Accounts :"davidevitturini:davidevitturini", "liotarquino:liotarquino"
// TODO do NOT store passwords in plain text (this is just for testing)
const url = "mongodb://127.0.0.1:27017/Tweb"
mongoose.Promise = global.Promise;
connection = mongoose.connect(url, {
    //checkServerIdentity: false
})
    .then(() => {
        console.log('connection to MongoDB was successful!');
    })
    .catch((error) => {
        console.log('connection to mongodb failed! ' + JSON.stringify(error));
    });