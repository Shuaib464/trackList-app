const mongoose = require('mongoose')

const daySchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
            }
        ],
        completedTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
            }
        ],
    }
)

module.exports = mongoose.model('Day', daySchema);