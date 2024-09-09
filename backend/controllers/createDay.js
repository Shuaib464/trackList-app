const Day = require('../models/day.model')

exports.createDay = async (req, res) => {
    try {
        // current DAY 
        const date = new Date();
        //create Day entry in DB
        const day = await Day.create({day: date.getDate()});

        if(day) {
            console.log("Created Day -> ",day);
            res.status(200).json({
                success: true,
                data: day,
                message: 'Day created successfully'
            })
        }else {
            console.log("error while creating the Day", error);
            res.status(404).json({
                success: false,
                message: 'error while creating the day'
            })
        }

    } catch (error) {
         // send failure message
         console.log("crateDay controller :: error :: ", error);
         res.status(500).json(
             {
                 success: false,
                 data: 'internal server error',
                 message: error.message,
             }
         )
    }
}