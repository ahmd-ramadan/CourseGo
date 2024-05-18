const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        required: true,
        enum: ["Admin", "Instructor", "Student"],
        default: "Student",
    },
    progress: [
        {
            courseId: {
                type: Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            }, sections: [{
                sectionId: {
                    type: Schema.Types.ObjectId,
                    ref: "CourseSection",
                    required: true,
                },
                status: {
                    type: String,
                    enum: ["Not Started", "In Progress", "Completed"],
                    default: "Not Started",
                },
            }]
        },
    ],
    coursesCreated: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",   
        }
    ],
    coursesApplied: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",   
        }
    ],
    lastLogin: {
        type: Date,
    },
})

module.exports = mongoose.model("User", userSchema);