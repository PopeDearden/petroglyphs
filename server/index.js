  
require('dotenv').config()
const express = require('express')
const massive = require ('massive')
const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env
const symbController = require ('./symbController')
const session = require ('express-session')

const app = express()

app.use(
    session({
        secret: SECRET,
        resave: false, 
        saveUninitialized: true,
    })
)
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance)
},
console.log('db is working'))
.catch(err=>console.log(err))

app.use(express.json())

app.get('/api/symbols', symbController.getSymbols)
app.get('/api/meaning/:id', symbController.getMeanings)

app.listen(SERVER_PORT, ()=> console.log(`${SERVER_PORT} wild chickens laying eggs`))