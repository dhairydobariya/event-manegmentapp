let express = require("express")
let controll = require("../controllers/eventcontroller")
let upload = require('../multer/multer')
let route = express()

route.post('/' , upload.single('image'), controll.eventadd )
route.get('/', controll.getevent)
route.patch('/:id' ,upload.single('image'), controll.updateevent)
route.delete('/:id',controll.deleteevent)
route.get('/allevents' , controll.allevent)

module.exports = route 
