  
require('dotenv').config()
const express = require('express')
const massive = require ('massive')
const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env
const symbController = require ('./symbController')
const session = require ('express-session')
const locationController = require ('./locationController')
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
app.get('/api/symbol/:id', symbController.getSymbol)
app.get('/api/meaning/:id', symbController.getMeanings)
app.get('/api/locations', locationController.getLocation)

app.post('/api/symbols', symbController.addSymbol)
app.post('/api/meaning/:id', symbController.addMeaning)
app.post('/api/location', locationController.addLocation)

app.delete('/api/meaning/:id', symbController.deleteMeaning)
app.delete('/api/symbol/:id', symbController.deleteSymbol)

app.put('/api/symbol/:id', symbController.updateSymbol)

app.listen(SERVER_PORT, ()=> console.log(`${SERVER_PORT} wild chickens laying eggs`))