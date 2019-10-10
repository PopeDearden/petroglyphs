  
require('dotenv').config()
const express = require('express')
const massive = require ('massive')
const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env
const symbController = require ('./symbController')
const session = require ('express-session')
const locationController = require ('./locationController')
const noteController = require('./noteController')
const app = express()
const authCtrl = require('./authController')

app.use( express.static( `${__dirname}/../build` ) );

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
app.get('/api/meanings', symbController.getAllMeanings)
app.get('/api/locations', locationController.getLocations)
app.get('/api/singlelocation/:id', locationController.getLocation)
app.get('/api/paneltable/:id', locationController.getPanelTable)
app.get('/api/notes/:id', noteController.getNotes)
app.get('/api/symbol/location/:id', locationController.getSymbolLocations)
app.get('/api/attributes', locationController.getAttributes)
app.post('/api/symbols', symbController.addSymbol)
app.post('/api/meaning/:id', symbController.addMeaning)
app.post('/api/location', locationController.addLocation)
app.post('/api/order/:id', locationController.addOrder)
app.post('/api/notes/:id', noteController.addNote)

app.delete('/api/meaning/:id', symbController.deleteMeaning)
app.delete('/api/symbol/:id', symbController.deleteSymbol)
app.delete('/api/order/:id', locationController.deleteOrder)
app.delete('/api/notes/:id', noteController.deleteNote)

app.put('/api/symbol/:id', symbController.updateSymbol)
app.put('/api/notes/:id', noteController.editNote)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.getUser)
app.get('/auth/check', authCtrl.checkUser)

app.listen(SERVER_PORT, ()=> console.log(`${SERVER_PORT} wild chickens laying eggs`))