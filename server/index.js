  
require('dotenv').config()
const express = require('express')
const massive = require ('massive')
const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env
const symbController = require ('./symbController')
const session = require ('express-session')
const locationController = require ('./locationController')
const app = express()
const authCtrl = require('./authController')

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
app.get('/api/locations', locationController.getLocations)
app.get('/api/singlelocation/:id', locationController.getLocation)
app.get('/api/paneltable/:id', locationController.getPanelTable)

app.post('/api/symbols', symbController.addSymbol)
app.post('/api/meaning/:id', symbController.addMeaning)
app.post('/api/location', locationController.addLocation)
app.post('/api/order/:id', locationController.addOrder)

app.delete('/api/meaning/:id', symbController.deleteMeaning)
app.delete('/api/symbol/:id', symbController.deleteSymbol)
app.delete('/api/order/:id', locationController.deleteOrder)

app.put('/api/symbol/:id', symbController.updateSymbol)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.getUser)
app.get('/auth/check', authCtrl.checkUser)

app.listen(SERVER_PORT, ()=> console.log(`${SERVER_PORT} wild chickens laying eggs`))