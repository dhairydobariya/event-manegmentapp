const documentation = `
# Event Management App - Backend Documentation

## Overview
The Event Management App allows users to manage events, perform CRUD operations, and RSVP to events. The backend uses Express.js, MongoDB with Mongoose, and integrates Cloudinary for image storage. It also includes JWT authentication for user management and role-based access control.

## API Endpoints

### User Management

#### 1. Register a User
- **Endpoint:** \`POST /register\`
- **Description:** Register a new user.
- **Request Body:**
  \`\`\`json
  {
    "name": "user_name",
    "password": "user_password",
    "email": "user_email@example.com"
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "message": "User successfully added"
  }
  \`\`\`

#### 2. Login a User
- **Endpoint:** \`POST /login\`
- **Description:** Log in a user and receive a JWT token.
- **Request Body:**
  \`\`\`json
  {
    "name": "user_name",
    "password": "user_password"
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "message": "User successfully logged in",
    "token": "jwt_token_here"
  }
  \`\`\`

#### 3. Logout a User
- **Endpoint:** \`GET /logout\`
- **Description:** Log out the user by clearing the JWT token.
- **Response:**
  \`\`\`json
  {
    "message": "User successfully logged out"
  }
  \`\`\`

### Event Management

#### 1. Create an Event
- **Endpoint:** \`POST /events\`
- **Description:** Create a new event with image upload support.
- **Request Body:**
  \`\`\`json
  {
    "etitle": "Event Title",
    "description": "Event Description",
    "date": "2024-10-01T00:00:00.000Z",
    "location": "Event Location",
    "maxAttendees": 100,
    "author": "Author Name",
    "authid": "author_id",
    "image": "image_file" // Form-data key for image upload
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "message": "Event successfully created",
    "event": {
      "id": "event_id",
      "etitle": "Event Title",
      ...
    }
  }
  \`\`\`

#### 2. Get All Events
- **Endpoint:** \`GET /events\`
- **Description:** Retrieve all events.
- **Response:**
  \`\`\`json
  {
    "events": [
      {
        "id": "event_id",
        "etitle": "Event Title",
        ...
      }
    ]
  }
  \`\`\`

#### 3. Update an Event
- **Endpoint:** \`PATCH /events/:id\`
- **Description:** Update an event by its ID. Allows image update as well.
- **Request Body:**
  \`\`\`json
  {
    "etitle": "Updated Event Title",
    "description": "Updated Event Description",
    "date": "2024-11-01T00:00:00.000Z",
    "location": "Updated Location",
    "maxAttendees": 150,
    "image": "new_image_file" // Form-data key for new image upload
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "message": "Event successfully updated",
    "event": {
      "id": "event_id",
      "etitle": "Updated Event Title",
      ...
    }
  }
  \`\`\`

#### 4. Delete an Event
- **Endpoint:** \`DELETE /events/:id\`
- **Description:** Delete an event by its ID.
- **Response:**
  \`\`\`json
  {
    "message": "Event successfully deleted",
    "event": {
      "id": "event_id",
      ...
    }
  }
  \`\`\`

### RSVP Management

#### 1. RSVP to an Event
- **Endpoint:** \`POST /events/:id/rsvp\`
- **Description:** RSVP to an event. Limits RSVPs based on the maximum number of attendees.
- **Request Body:**
  \`\`\`json
  {
    "userId": "user_id" // User ID making the RSVP
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "message": "RSVP successfully recorded",
    "event": {
      "id": "event_id",
      ...
    }
  }
  \`\`\`

#### 2. View User's RSVPed Events
- **Endpoint:** \`GET /rsvp/user/events\`
- **Description:** Retrieve all events a user has RSVPed to.
- **Response:**
  \`\`\`json
  {
    "events": [
      {
        "id": "event_id",
        "etitle": "Event Title",
        ...
      }
    ]
  }
  \`\`\`

## Error Handling
- **Invalid Token:** 
  \`\`\`json
  {
    "message": "Access denied. Token missing."
  }
  \`\`\`
- **Unauthorized Access:** 
  \`\`\`json
  {
    "message": "Invalid token"
  }
  \`\`\`
- **Server Error:** 
  \`\`\`json
  {
    "message": "Server error",
    "error": "error_message"
  }
  \`\`\`

## Model Definitions

### User Schema
\`\`\`javascript
let mongoose = require("mongoose");

let userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    RSVPedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

let usermodel = mongoose.model('users', userschema);

module.exports = usermodel;
\`\`\`

### Event Schema
\`\`\`javascript
let mongoose = require("mongoose");

let eventschema = mongoose.Schema({
    etitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Event date must be in the future.'
        }
    },
    location: {
        type: String,
        required: true
    },
    maxAttendees: {
        type: Number,
        required: true
    },
    RSVPs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: String,
        required: true
    },
    authid: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });

let eventModel = mongoose.model('Event', eventschema);

module.exports = eventModel;
\`\`\`

## Cloudinary Integration
Cloudinary is used for storing event images. Ensure you have configured Cloudinary in your application and use the cloudinary package for uploading and managing images.

### Cloudinary Configuration
\`\`\`javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});
\`\`\`

### Upload Image
\`\`\`javascript
const uploadImage = (filePath) => {
    return cloudinary.uploader.upload(filePath, { folder: 'events' });
};
\`\`\`

### Delete Image
\`\`\`javascript
const deleteImage = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
};
\`\`\`
`;

console.log(documentation);
