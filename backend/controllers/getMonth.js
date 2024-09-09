const Month = require('../models/month.model')
const Day = require('../models/day.model')

const date = new Date();
const calculateDaysOfMonth = () => {
    let year = date.getFullYear()
    let month = date.getMonth()
    // create a date object for the first day of the next month
    let nextMonth = new Date(year, month + 1, 1);
    // subtract one day to get the last day of the current month
    let lastDayOfCurrentMonth = new Date(nextMonth - 1);
    // get the total no of days
    let totalDays = lastDayOfCurrentMonth.getDate();
    return totalDays;
}

const createDaysObj = () => {
    let days = [];
    const totalDays = calculateDaysOfMonth();
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
            const docs = await Day.insertMany(createDaysObj())
            console.log("Days created successfully -: ", docs)
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