const express = require('express');
const db = require('../db');
const utils = require('../utils');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const config = require('../config');
var router = express.Router();

router.put('/profile/:id', (request, response) => {
    const { firstName, lastName, phone } = request.body

    const statement = `update user set firstName = ?, lastName = ?, phoneNumber = ? where id = ?;`

    db.pool.execute(
        statement,
        [firstName, lastName, phone, request.params.id],

        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

router.get('/profile/:id', (request, response) => {
    const statement = `select firstName, lastName, phoneNumber, email from user where id = ?;`

    db.pool.execute(statement, [request.params.id], (error, result) => {
        response.send(utils.createResult(error, result))
    })
})

//Select
router.get('/register', (request, response) => {
    // console.log(request.body);
    // const { firstName, lastName, email, password, phone } = request.body;
    const statement = `select * from user`;

    db.pool.execute(
        statement,
        (error, result) => {

            // [firstName, lastName, email, password, phone], 
            response.send(utils.createResult(error, result))
        }
    )
});

//Insert
router.post('/register', (request, response) => {
    // console.log(request.body);
    const { firstName, lastName, email, password, phone } = request.body;
    const statement = `insert into user (firstName, lastName, email, password, phoneNumber) values ( ?, ?, ?, ?, ?);`

    db.pool.execute(    // Connection established
        statement,
        [firstName, lastName, email, password, phone], (error, result) => { response.send(utils.createResult(error, result)) }
    )
});

router.post('/login', (request, response) => {
    const { email, password } = request.body
    const statement = 'select  id , firstName , lastName , phoneNumber , isDeleted from user where email = ? and password = ?'

    db.pool.query(statement, [email, password], (error, users) => {
        if (error) {
            repsone.send(utils.createErrorResult(error))
        } else {
            if (users.length == 0) {    // if email does not match
                repsone.send(utils.createErrorResult("User Doesnt exits !"))
            } else {
                const user = users[0]   // 1st row
                if (user.isDeleted) {
                    repsone.send(utils.createErrorResult("Your Account Is Closed"))
                } else {
                    const payload = { id: user.id }

                    const token = jwt.sign(payload, config.secret)
                    const userData = {
                        token,
                        name: `${user['firstName']} ${user['lastName']}`,
                    }
                    response.send(utils.createSuccessResult(userData))
                }
            }
        }
    })
})

module.exports = router;