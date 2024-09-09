const mongoose = require('mongoose')

const monthSchema = new mongoose.Schema(
    {
        month: {
            type: Number,
            required: true,
        },
        days: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Day',
            }
        ],
        year: {
            type: Number,
            required: true,
        }
    }
)

module.exports = mongoose.model('Month', monthSchema);