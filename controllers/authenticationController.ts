const express = require('express');
const ROUTE = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = require('../schemas/userSchema')


// unsecured routes
ROUTE.route('/signup').post(async (req: any, res: any) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({text: 'first name, last name, email and password is required'})
    }

    const exists = await userSchema.findOne({email})
    if (exists) {
        res.status(409).json({text: 'That email adress is already being used'})
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)



        const newUser = await userSchema.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            res.status(201).json({text: 'New user was created'})
        } else {
            res.status(400).json({text: 'Something went wrong'})
        }
    }


})

// ROUTE.route('/signin').post(async (req, res) => {
    
// })

module.exports = ROUTE