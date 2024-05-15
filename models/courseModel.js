const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "CourseSection",
        }
    ],
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Course", courseSchema);