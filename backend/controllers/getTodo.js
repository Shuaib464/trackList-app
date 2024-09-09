const Todo = require('../models/todo.model')
const Day = require('../models/day.model')

exports.getTodosByDay = async (req, res) => {
    try {
        //extract dayid from params
        const dayId = req.params.dayId 
        console.log('DayId is -: ', dayId)
        const day = await Day.find({_id: dayId}).populate("todos")
        console.log('Fetched Day is -: ',day)
                               
        if(!day) {
            return res.status(404).json({
                success: true,
                message: 'Day not found in DB',
            })     
        } else {
            return res.status(202).json(
                {
                    success: true,
                    data: day,
                    message: 'Day(todos) fetched successfully',
                }
            )
        }
    } catch (error) {
        console.log('getTodo error ',error);
        res.status(500).json(
            {
                success: false,
                message:error.message,
                data: 'Internal Server error'
            }
        )
        
    }
}


// get todo by id
exports.getTodoById = async (req, res) => {
    try {
        // extract id from req params
        const id = req.params.id;
        // find todo basis on id
        const todo = await Todo.findById({_id: id});
        // if data not found for given id
        if(!todo) {
            return res.status(404).json({
                success: false,
                message:"No Data found for given Id"
            })
        }
        // send res status
        res.status(200).json(
            {
                success: true,
                data: todo,
                message: 'Todo fetched successfully'
            }
        )
    } catch (error) {
        console.log('getTodoById error ', error)
        res.status(500).json(
            {
                success: false,
                data: 'Internal server error',
                message: error.message,
            }
        )
    }
}