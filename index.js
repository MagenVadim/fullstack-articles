import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {validationResult} from 'express-validator';

import {registerValidattion} from './validations/auth.js';

mongoose
.connect('mongodb+srv://magenvadim:X7LJbTLyB1gsr5BG@cluster0.bjxlrug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB is ok'))
.catch((err)=>console.log('DB is error', err))


const app = express()
app.use(express.json())

app.post('/auth/register', registerValidattion, (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    res.json({
        success: true
    })
})




app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})