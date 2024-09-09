const Todo = require('../models/todo.model')
const Day = require('../models/day.model')

exports.updateTodo = async (req, res) => {
    try {
        // extract todo id from params
        const id = req.params.id;
        // extract title-desc from req body
        const {title, completed, dayId} = req.body;
        console.log("DayId is {updateTodo} -: ", dayId)

        // find todo by id and update in db
        const updatedTodo = await Todo.findByIdAndUpdate(
                                            id,
                                            {title, completed},
                                            {new : true}
        )
        if (!updatedTodo) {
            console.log('updateTodo :: error ::')
            return  res.status(401).json(
                {
                    success: false,
                    message: 'updateTodo error'
                }
            )
        }
        // if TODO completed then create todo entry in completedTodos in Day_Model
        if(updatedTodo.completed) {
            const updatedDay = await Day.findByIdAndUpdate(
                                                        {_id: dayId},
                                                        { $push: { completedTodos: updatedTodo._id}},
                                                        {new: true}
                                                    )
            if(!updatedDay) {
                return response.status(402).json({
                    success: false,
                    message: 'Unable to create entry of todo inside completedTodos of Day ',
                    data: updatedTodo
                })
            }
        }
        return res.status(200).json(
            {
                success: true,
                data: updatedTodo,
                message: 'Todo updated successfully',
            }
        )
    } catch (error) {
        console.log('UpdateTodo error ', error)
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                data: 'Internal Server error'
            }
        )
    }
}