require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express()
const pool = require('./config/mysql')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1',require('./app/routes'))

app.listen(process.env.PORT, ()=>{
    console.log(`API en http://localhost:${process.env.PORT}`);
})