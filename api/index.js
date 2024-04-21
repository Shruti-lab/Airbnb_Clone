//mongodb password: CQsU2FFikTXV2OuT

const express = require('express')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const CookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const PORT = 4000
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jhbjfdfcbcWEFDfvfcd';  //random string

app.use(express.json());  //express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: 'http://127.0.0.1:5173/',
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res)=>{
    res.json('test ok')
});

app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
    }catch(e){
        res.status(422).json(e)
    }
})


app.post('/login', async (req,res)=>{
    const {email,password} = req.body;
        const userDoc = await User.find({email})
        if(userDoc){
            // res.json('found')
            const passOk = bcrypt.compareSync(password,userDoc.password);
            if(passOk){
                // res.json('password OK')
                jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(userDoc);
                })  //because id's in mongoose db (mongodb) start with '_' ie is _id

            }else{
                res.status(422).json('Password not OK')
            }
        }else{
            res.json('not found')
        }
});


app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){

    }else{
        
    }
                                                                                                                                                                                                                                                                                                                                                                                                                       
})

app.listen(PORT,console.log(`Server running at http://127.0.0.1:${PORT}`))