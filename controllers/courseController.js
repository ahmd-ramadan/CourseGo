const asyncHandler = require('express-async-handler');

const Course = require('../models/courseModel');
const User = require('../models/userModel');
const CourseSection = require('../models/courseSectionModel');
const course = require('../models/courseModel');

const courseCtrl = {
    //! Create course
    create: asyncHandler(
        async(req, res) => {
            const {title, description, difficulty, duration} = req.body;
            //! Find the user
            const userFound = await User.findById(req.user);
            if(!userFound) {
                res.status(404);
                throw new Error("User Not Found");
            }
            // console.log(userFound);
            if(userFound.role != "Instructor") {
                res.status(401);
                throw new Error("User Not Authenticated, Instructor Only");
            }
            //! Validate the user input
            if(!title || !description || !difficulty || !duration) {
                throw new Error("Please provide all fields");
            }
            //! Check if course already exists
            const courseFound = await Course.findOne({title});
            if(courseFound)  {
                throw new Error("Course already exists");
            }
            //! Create the course
            const courseCreated = await Course.create({
                title,
                description,
                difficulty,
                duration,
                user: req.user,
            });
            //! Push the course to user and save 
            userFound.coursesCreated.push(courseCreated._id);
            await userFound.save();
            //! Send the response
            res.status(200).json({
                status: 'success',
                data: {courseCreated},
            });
        }
    ),

    //! Get all courses
    lists: asyncHandler(
        async(req, res) => {
            const courses = await Course.find().populate({
                path: "user",
                model: "User",
                select: "username email"
            });
            res.status(200).json({status: 'success', data: {courses}});
        }
    ),

    //! Get a course
    getCourseById: asyncHandler(
        async(req, res) => {
            const course = await Course.findById(req.params.courseId); //.populate("sections");
            if(!course) {
                res.status(404).json({
                    status: 'failed',
                    data: 'Course not found'
                });
            }
            res.status(200).json({status: 'sucsess', data: {course}});
        }
    ),

    //! Update course 
    update: asyncHandler(
        async(req, res) => {
            const course = await Course.findByIdAndUpdate(
                req.params.courseId,
                req.body,
                {new: true},
            );
            if(!course) {
                res.ststus(404);
                throw new Error('Course not found');
            }
            res.status(200).json({
                message: 'course updated successfully',
                status: 'success',
                data: {course},
            })
        }
    ),

    //! Delete Course
    delete: asyncHandler(
        async(req, res) => {
            //! find Course By Id
            const courseId = req.params.courseId;
            const course =  await Course.findById(courseId);
            if(!course) {
                res.status(404).json({
                    status: 'failed',
                    data: 'Course not found',
                });
                return;
            }
            if(course && course.students.length > 0) {
                res.status(400).json({
                    status: 'failed',
                    data: 'Course has Students, cnnot delete',
                })
                return;
            }
            // !Proceed to delete
            await Course.findByIdAndDelete(courseId);
            await User.updateMany(
                {
                    coursesCreated: courseId,
                },
                {
                    $pull: {
                        coursesCreated: courseId,
                    }
                }
            );
            res.status(200).json({
                status: 'success',
                data: 'Courses deleted successfully'
            })
        }
    ) 
}

module.exports = courseCtrl;
