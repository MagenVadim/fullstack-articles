import express from 'express';

const app = express()

app.get('/', (req, res)=>{
    res.send("0000000, Hello, my Friend")
});

app.post('/auth/login', (req, res)=>{
    res.json({
        success: true,
    })
})


app.listen(4444, (err)=>{
    if(err){return console.log(err)}
    console.log('Server OK')
})