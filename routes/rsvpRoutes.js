let express = require('express');
let controll = require('../controllers/rsvpController');

let route = express();

route.post('/rsvp/:id', controll.rsvpToEvent);

route.get('/rsvp/:id', controll.viewRsvpStatus);

route.get('/user/events', controll.viewUserEvents);

module.exports = route;
