const mongoose = require('mongoose')
require('dotenv').config()

// function to connect with db
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('DB connected successfully'))
        .catch((err) => {
            console.log('DB connection error')
            console.error(err);
            process.exit(1);
        });
}

//export the function
module.exports = dbConnect;