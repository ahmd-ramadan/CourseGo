const asyncHandler = require('express-async-handler');

const Course = require('../models/courseModel');
const User = require('../models/userModel');
const CourseSection = require('../models/courseSectionModel');
const course = require('../models/courseModel');


const progressCtrl = {
    //! Apply to a course
    applyToCourse: asyncHandler(
        async(req, res) => {
            //! Find the user
            const userId = req.user;
            const user = await User.findById(userId);
            if(!user) {
                res.status(404).json({
                    status: 'fail',
                    data: 'User not found'
                });
                return;
            }
            //! Validate the course
            const courseId = req.params.courseId;
            const course = await Course.findById(courseId);
            // console.log(courseId);
            if(!course) {
                res.status(404).json({
                    status: 'fail',
                    data: 'Course not found'
                });
                return;
            }
            //! Check if the user is already enrolled in the course
            const isAlreadyEnrolled = user.progress.some((progress) => {
                progress.courseId.toString() === courseId.toString();
            })
            if(isAlreadyEnrolled) {
                res.status(400).json({
                    staus: 'fail',
                    data: 'You have already in this course'
                });
                return;
            }
            //! Add the course to user's progress
            user.progress.push({
                courseId: course.id,
                sections: []
            });
            await user.save();
            //! push the user to the course
            course.students.push(userId);
            user.save();
            //! send the response
            res.status(200).json({
                status: 'success',
                data: 'You applied in this course succesfully'
            });
        }
    )
}

module.exports = progressCtrl;

