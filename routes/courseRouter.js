const express = require('express');
const courseRouter = express.Router();

const courseCtrl = require('../controllers/courseController');
const isAuthenticated = require('../middlewares/isAuth');


courseRouter.route('/create')
    .post(isAuthenticated, courseCtrl.create);

courseRouter.route('/lists')
    .get(courseCtrl.lists);


courseRouter.route('/:courseId')
    .get(courseCtrl.getCourseById)
    .post(isAuthenticated, courseCtrl.update)
    .delete(isAuthenticated, courseCtrl.delete)

module.exports = courseRouter;