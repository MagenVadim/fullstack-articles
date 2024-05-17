import express from 'express';
import mongoose from 'mongoose';
import {registerValidattion, loginValidattion, postCreateValidattion} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import multer from 'multer'

mongoose
.connect('mongodb+srv://magenvadim:X7LJbTLyB1gsr5BG@cluster0.bjxlrug.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('DB is ok'))
.catch((err)=>console.log('DB is error', err))

const app = express();


const storage = multer.diskStorage({
    destination:(_, __, cb)=>{
        cb(null, 'uploads');
    },
    filename:(_, file, cb)=>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage}).single('image');

app.use(express.json())

app.post('/auth/login', loginValidattion, UserController.login)
app.post('/auth/register', registerValidattion, UserController.register)
app.get('/auth/me', checkAuth , UserController.getMe);


app.post('/upload', checkAuth, upload, (res, req)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})



app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidattion, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})