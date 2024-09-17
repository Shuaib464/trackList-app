const express = require('express')

// create instance of server
const app = express();
const cors = require('cors')

//load config from env file
require('dotenv').config()

// configure cors
const corsOptions = {
    origin: 'https://track-list-frontend.vercel.app/',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

// define port no for server
const PORT = process.env.PORT || 4000;

// middleware to parse req body
app.use(express.json());

// mount the todo api routes
const tracklistRoutes = require('./routes/tracklist.routes')
app.use('/api/v1', tracklistRoutes);

// Live the server at given Port 
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT} successfully`);
})

// connect with DB
const dbConnect = require('./config/database')
dbConnect();