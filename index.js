import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import {registerValidattion, loginValidattion, postCreateValidattion} from './validations.js';
import {UserController, PostController} from './controllers/indexs.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';


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

app.use(express.json());
app.use('/uploads', express.static('uploads'));



app.post('/auth/login', loginValidattion, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidattion, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth , UserController.getMe);


const upload = multer({storage: storage}).single('image');

app.post('/upload', checkAuth, upload, function (req, res, next) {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})



app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidattion, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidattion, handleValidationErrors, PostController.update);

app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})