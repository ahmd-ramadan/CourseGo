const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/userRouter');
const coursesRouter = require('./routes/courseRouter');
const courseSectionsRouter = require('./routes/courseSectionRouter');
const progressRouter = require('./routes/progressRouter');

require('dotenv').config();
const app = express();

const mongodburl = process.env.MONGO_URL;
mongoose.connect(mongodburl)
.then(() => { 
    console.log('mongodb is connected ...')
}).catch((err) => {
    console.log(err.message);
})

//! middlewares
app.use(express.json());

//! Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/sections', courseSectionsRouter);
app.use('/api/v1/progress', progressRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});