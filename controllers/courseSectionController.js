const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const CourseSection = require('../models/courseSectionModel');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

const courseSectionsCtrl = {
    //! Add course section
    create: asyncHandler(
        async(req, res) => {
            const userFound = await User.findById(req.user);
            if(!userFound) {
                res.status(404);
                throw new Error("User Not Found");
            }
            //! Get the section name
            const {sectionName} = req.body;
            //! Get the courseId
            const courseId = req.params.courseId;
            console.log(courseId);
            //! Validate the courseId
            if(!mongoose.Types.ObjectId.isValid(courseId)) {
                throw new Error("Invalid Course Id");
            }
            //! Find the course
            const courseFound = await Course.findById(courseId);
            console.log(courseFound);
            if(!courseFound)  {
                throw new Error("Course not Found");
            }
            //! Validate the section name
            if(!sectionName) {
                throw new Error("Please provide section name");
            }
            //! create the course ssection
            const courseSectionCreated = await CourseSection.create({
                sectionName,
                user: req.user,
            });
            //! Push the courseSection to course and save 
            courseFound.sections.push(courseSectionCreated._id);
            await courseFound.save();
            //! Send the response
            res.status(200).json({
                message: "Courses created successfully",
                status: 'success',
                data: {courseSectionCreated},
            });
        }
    ),

    //! Get all sections
    lists: asyncHandler(
        async(req, res) => {
            const sections = await CourseSection.find().populate({
                path: "user",
                model: "User",
                select: "username email"
            });
            res.status(200).json({status: 'success', data: {sections}});
        }
    ),

    //! Get a course section
    getsectionById: asyncHandler(
        async(req, res) => {
            const section = await CourseSection.findById(req.params.sectionId);
            if(!section) {
                res.status(404).json({
                    status: 'failed',
                    data: 'Section not found'
                });
            }
            res.status(200).json({status: 'sucsess', data: {section}});
        }
    ),

    //! Update section
    update: asyncHandler(
        async(req, res) => {
            const section = await CourseSection.findByIdAndUpdate(
                req.params.sectionId,
                req.body,
                {new: true},
            );
            if(!section) {
                res.status(404);
                throw new Error('Section not found');
            }
            res.status(200).json({
                message: 'Section updated successfully',
                status: 'success',
                data: {section},
            })
        }
    ),

    //! Delete section
    delete: asyncHandler(
        async(req, res) => {
            //! find section By Id
            const sectionId = req.params.sectionId;
            const section =  await CourseSection.findById(sectionId);
            // console.log(sectionId);
            // console.log(section);
            if(!section) {
                res.status(400).json({
                    status: 'failed',
                    data: 'Section not found',
                })
                return;
            }
            //! Find the course associated with the section to check for enrolled studets
            const course = await Course.findOne({sections: sectionId}).populate("students");
            if(!course) {
                res.status(404).json({status: 'failed', data: 'Associated course not found'})
                return;
            }
            //! Check if the course has any students enrolled
            if(course.students.length > 0) {
                res.status(400).json({
                    status: 'failed',
                    data: 'Associated course has students, cannot delete this section',
                });
                return;
            }
            // !Proceed to delete
            await CourseSection.findByIdAndDelete(sectionId);
            //! Remove the Section from cources's sections array
            await Course.findByIdAndUpdate(course._id, {
                $pull: {
                    sections: sectionId,
                } 
            });
            //! send Response
            res.status(200).json({
                status: 'success',
                data: 'section deleted successfully'
            });
        }
    )

}
module.exports = courseSectionsCtrl;
