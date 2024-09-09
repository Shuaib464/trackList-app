const Todo = require('../models/todo.model')
const Day = require('../models/day.model')

// define route handler
exports.createTodo = async (req, res) => {
    
    try {
        //extract day from 
        // extract title from req ki body
        const {title, dayId} = req.body;
        //create a new Todo and insert in DB
        const todo = await Todo.create({title});
        // if todo inserted in DB then make an entry in Day schema as well
        if(todo) {
            const day = await Day.findByIdAndUpdate(
                                            {_id: dayId},
                                            { $push: { todos: todo._id}},
                                            {new: true}
                                        )
            console.log("day after todo entry -: ",day)
            if(day) {
                res.status(200).json(
                    {
                        success: true,
                        data: todo,
                        message: 'Todo Entry created successfully'
                    }
                )
            }
        }

    } catch (error) {
        // send failure message
        console.log(error);
        res.status(500).json(
            {
                success: false,
                data: 'internal server error',
                message: error.message,
            }
        )
    }

}

// export route handler
// module.exports = createTodo;