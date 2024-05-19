const express = require('express');
const progressRouter = express.Router();

const progressCtrl = require('../controllers/progressController');
const isAuthenticated = require('../middlewares/isAuth');

progressRouter.route('/:courseId')
    .post(isAuthenticated, progressCtrl.applyToCourse)

module.exports = progressRouter;