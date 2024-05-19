const express = require('express');
const courseSectionRouter = express.Router();

const courseSectionCtrl = require('../controllers/courseSectionController');
const isAuthenticated = require('../middlewares/isAuth');

courseSectionRouter.route('/lists')
    .get(courseSectionCtrl.lists);

courseSectionRouter.route('/:sectionId')
    .post(isAuthenticated, courseSectionCtrl.create)
    .get(courseSectionCtrl.getsectionById)
    .post(isAuthenticated, courseSectionCtrl.update)
    .delete(isAuthenticated, courseSectionCtrl.delete)

module.exports = courseSectionRouter;