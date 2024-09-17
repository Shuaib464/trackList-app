const Month = require('../models/month.model')
const Day = require('../models/day.model')

const date = new Date();
// // let year = date.getFullYear()
// // let month = date.getMonth()
// const calculateDaysOfMonth = (month=date.getMonth(), year=date.getFullYear()) => {
//     // create a date object for the first day of the next month
//     let nextMonth = new Date(year, month + 1, 1);
//     // subtract one day to get the last day of the current month
//     let lastDayOfCurrentMonth = new Date(nextMonth - 1);
//     // get the total no of days
//     let totalDays = lastDayOfCurrentMonth.getDate();
//     return totalDays;
// }
function calculateDaysOfMonth(month = date.getMonth(), year = date.getFullYear()) {
    month++;
    return new Date(year, month, 0).getDate();
  }
  

const createDaysObj = (totalDays) => {
    let days = [];
    // const totalDays = calculateDaysOfMonth();
    for(let i=1; i<=totalDays; i++){
        const dayObj = {day: i, todos:[], completedTodos:[]}
        days.push(dayObj)
    }
    return days;
}

exports.getMonth = async(req, res) => {
    try {
        // check current month exist in DB ?
        const month = await Month.findOne({month:date.getMonth(), year: date.getFullYear()}).populate('days')
        // console.log("month fetched response -:: ",month);
        
        // if month exists
        if(month){
            // return month 
            // console.log('Current Month res -> ', month)
            return res.status(201).json({
                success: true,
                data: month,
                message: "Current month fetched successfully"
            })
        } else {
            // if month not exists
            const totalDays = calculateDaysOfMonth();
            console.log('Total_Days ---: ',totalDays)
            const docs = await Day.insertMany(createDaysObj(totalDays))
            // console.log("Days created successfully -: ", docs)
            // extract all days id from docs 
            let arrId = docs.map((doc) => (doc._id));
            // create month entry in db
            const createdMonth = await Month.create(
                                                {
                                                    month: date.getMonth(),
                                                    days: arrId,
                                                    year: date.getFullYear()
                                                }
                                            )
            // console.log("Created Month -> ",createdMonth)

            // fetch month
            if(createdMonth) {
                const month = await Month.findById(createdMonth._id).populate('days')
                // console.log("fetch month -: ",month)
                if(month) {
                    return res.status(202).json({
                        success: true,
                        data: month,
                        message: 'Month fetched successfully'
                    })
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Month not found in DB'
                    })
                }
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Error in create month',
                })
            }
                            
        }
    } catch (error) {
        // send failure message
        console.log("getMonth controller :: error :: ", error);
        res.status(500).json(
            {
                success: false,
                data: 'internal server error',
                message: error.message,
            }
        )
    }
}

exports.getMonthByDate = async(req, res) => {
    try {
        //extract month and year from req body
        const {month, year} = req.query;
        console.log('month [getMonthByDate] -: ', month)
        // check current month exist in DB ?
        const monthPresent = await Month.findOne({month:month, year: year}).populate('days')
        // console.log("month fetched response -:: ",monthPresent);
        
        // if month exists
        if(monthPresent){
            // return month 
            // console.log('Current Month res -> ', monthPresent)
            return res.status(201).json({
                success: true,
                data: monthPresent,
                message: "Current month fetched successfully"
            })
        } else {
            // if month not exists
            const totalDays = calculateDaysOfMonth(month, year)
            console.log('Total-Days -: ',totalDays)
            const docs = await Day.insertMany(createDaysObj(totalDays))
            // console.log("Days created successfully -: ", docs)
            // extract all days id from docs 
            let arrId = docs.map((doc) => (doc._id));
            // create month entry in db
            const createdMonth = await Month.create(
                                                {
                                                    month: month,
                                                    days: arrId,
                                                    year: year,
                                                }
                                            )
            // console.log("Created Month -> ",createdMonth)
            
            if(!createdMonth) {
                return res.status(500).json({
                    success: false,
                    message: 'Error occured while creating month',
                })
            }
            // fetch month
            if(createdMonth) {
                const month = await Month.findById(createdMonth._id).populate('days')
                // console.log("fetch month -: ",month)
                if(month) {
                    return res.status(202).json({
                        success: true,
                        data: month,
                        message: 'Month fetched successfully'
                    })
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Month not found in DB'
                    })
                }
            }
                            
        }
    } catch (error) {
        // send failure message
        console.log("getMonth controller :: error :: ", error);
        res.status(500).json(
            {
                success: false,
                data: 'internal server error',
                message: error.message,
            }
        )
    }
}

exports.getMonthById = async(req, res) => {
    try {
        //extract month-id from params
        const monthId = req.params.monthId;
        // find month in DB by id
        const month = await Month.findOne({_id: monthId}).populate('days')

        if(!month) {
            return res.status(404).json({
                success: false,
                message: 'Month not found...'
            })
        }
        // return if month exist
        return res.status(200).json({
            success: true,
            data: month,
            message: 'Month fetched successfully'
        })
    } catch (error) {
        console.log('Error occured while fetching month by ID -: ', error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}