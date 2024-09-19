let express = require("express")
let app = express()
let port = process.env.PORT
const path = require('path');
let route = require('./routes/route')
let event = require('./routes/eventRoutes')
let rsvp = require('./routes/rsvpRoutes')
let bodyparser = require('body-parser')
let mongoose =  require('./db/datbase')
let cookieparser = require('cookie-parser')
require('dotenv').config();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.json());
app.use(cookieparser())
app.use('/' , route)
app.use('/event' , event)
app.use('/rsvp' , rsvp)

app.listen(port , (req ,res) => {
    console.log(`port successfully run on ${port}`)
})
 
