import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {validationResult} from 'express-validator';

import bcrypt from 'bcrypt'
import {registerValidattion} from './validations/auth.js';
import UserModel from './models/User.js'

mongoose
.connect('mongodb+srv://magenvadim:X7LJbTLyB1gsr5BG@cluster0.bjxlrug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB is ok'))
.catch((err)=>console.log('DB is error', err))

const app = express()
app.use(express.json())


app.post('/auth/register', registerValidattion, async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);


    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,        
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();
    res.json(user);
})


app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})