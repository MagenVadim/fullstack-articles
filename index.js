import express from 'express';
import mongoose from 'mongoose';
import {registerValidattion} from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'

mongoose
.connect('mongodb+srv://magenvadim:X7LJbTLyB1gsr5BG@cluster0.bjxlrug.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB is ok'))
.catch((err)=>console.log('DB is error', err))

const app = express()
app.use(express.json())


app.post('/auth/login', UserController.login)

app.post('/auth/register', registerValidattion, UserController.register)

app.get('/auth/me', checkAuth , UserController.getMe);


app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})