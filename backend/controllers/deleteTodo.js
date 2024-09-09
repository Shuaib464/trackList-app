const Todo = require('../models/todo.model')
const Day = require('../models/day.model')

exports.deleteTodo = async(req, res) => {
    try {
        // extract id from params 
        const todoId = req.params.id
        const dayId = req.body.dayId
        console.log("DAyId in deleteTodo -: ",dayId)
        // find todo by id and delete it
        const todo = await Todo.findByIdAndDelete({_id: todoId});
        console.log("deleted todo -: ",todo)
        if(todo) {
             // remove todo id from Day model as well
             const updateDay = await Day.findByIdAndUpdate(
                                                            {_id: dayId},
                                                            { $pull: { todos: todoId}},
                                                            {new: true}
                                                            
                                                        )
            console.log("Updated DAy after todoId removal -: ", updateDay)
            if(updateDay) {
                return res.status(200).json(
                    {
                        success: true,
                        data: todo,
                        message: 'todo deleted successfully'
                    }
                )
            }
            else{
                return res.status(402).json({
                    success: false,
                    message: 'Unable to remove todoId from Day model'
                })
            }
            
        } else{
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                data: "Internal Server error"
            }
        )
    }
}