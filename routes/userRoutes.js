const express = require('express');
const usersRouter = express.Router();

const usersCtrl = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuth');

usersRouter.post('/register', usersCtrl.register);
usersRouter.post('/login', usersCtrl.login);
usersRouter.get('/profile', isAuthenticated, usersCtrl.profile);

module.exports = usersRouter;