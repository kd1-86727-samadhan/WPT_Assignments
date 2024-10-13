const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const utils = require('./utils'); // import utils
const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');
const bookingRouter = require('./routers/booking');
const propertyRouter = require('./routers/property');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/booking', bookingRouter);
app.use('/property', propertyRouter);

app.use((request, response, next) => {

    if (
        request.url == './user/login' ||
        request.url == './user/register' ||
        request.url == './user/property' ||
        request.url == './user/profile' ||
        request.url.startsWith('/image/')
    ) {
        next();
    }
    else {
        console.log("Success");
    }
})

app.use(express.json()); //this line will create request.body from
app.use("/user", userRouter);
app.listen(9999, () => { console.log("server started at port 9999") });