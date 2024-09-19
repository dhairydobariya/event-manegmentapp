<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management App - Backend Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .request, .response {
            margin-bottom: 10px;
        }
        .request {
            background-color: #e6f7ff;
            padding: 10px;
        }
        .response {
            background-color: #e6ffe6;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>Event Management App - Backend Documentation</h1>

    <h2>Overview</h2>
    <p>The Event Management App allows users to manage events, perform CRUD operations, and RSVP to events. The backend uses Express.js, MongoDB with Mongoose, and integrates Cloudinary for image storage. It also includes JWT authentication for user management and role-based access control.</p>

    <h2>API Endpoints</h2>

    <h3>User Management</h3>

    <h4>1. Register a User</h4>
    <p><strong>Endpoint:</strong> <code>POST /register</code></p>
    <p><strong>Description:</strong> Register a new user.</p>
    <div class="request">
        <strong>Request Body:</strong>
        <pre>{
  "name": "user_name",
  "password": "user_password",
  "email": "user_email@example.com"
}</pre>
    </div>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "User successfully added"
}</pre>
    </div>

    <h4>2. Login a User</h4>
    <p><strong>Endpoint:</strong> <code>POST /login</code></p>
    <p><strong>Description:</strong> Log in a user and receive a JWT token.</p>
    <div class="request">
        <strong>Request Body:</strong>
        <pre>{
  "name": "user_name",
  "password": "user_password"
}</pre>
    </div>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "User successfully logged in",
  "token": "jwt_token_here"
}</pre>
    </div>

    <h4>3. Logout a User</h4>
    <p><strong>Endpoint:</strong> <code>GET /logout</code></p>
    <p><strong>Description:</strong> Log out the user by clearing the JWT token.</p>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "User successfully logged out"
}</pre>
    </div>

    <h3>Event Management</h3>

    <h4>1. Create an Event</h4>
    <p><strong>Endpoint:</strong> <code>POST /events</code></p>
    <p><strong>Description:</strong> Create a new event with image upload support.</p>
    <div class="request">
        <strong>Request Body:</strong>
        <pre>{
  "etitle": "Event Title",
  "description": "Event Description",
  "date": "2024-10-01T00:00:00.000Z",
  "location": "Event Location",
  "maxAttendees": 100,
  "author": "Author Name",
  "authid": "author_id",
  "image": "image_file" // Form-data key for image upload
}</pre>
    </div>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "Event successfully created",
  "event": {
    "id": "event_id",
    "etitle": "Event Title",
    ...
  }
}</pre>
    </div>

    <h4>2. Get All Events</h4>
    <p><strong>Endpoint:</strong> <code>GET /events</code></p>
    <p><strong>Description:</strong> Retrieve all events.</p>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "events": [
    {
      "id": "event_id",
      "etitle": "Event Title",
      ...
    }
  ]
}</pre>
    </div>

    <h4>3. Update an Event</h4>
    <p><strong>Endpoint:</strong> <code>PATCH /events/:id</code></p>
    <p><strong>Description:</strong> Update an event by its ID. Allows image update as well.</p>
    <div class="request">
        <strong>Request Body:</strong>
        <pre>{
  "etitle": "Updated Event Title",
  "description": "Updated Event Description",
  "date": "2024-11-01T00:00:00.000Z",
  "location": "Updated Location",
  "maxAttendees": 150,
  "image": "new_image_file" // Form-data key for new image upload
}</pre>
    </div>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "Event successfully updated",
  "event": {
    "id": "event_id",
    "etitle": "Updated Event Title",
    ...
  }
}</pre>
    </div>

    <h4>4. Delete an Event</h4>
    <p><strong>Endpoint:</strong> <code>DELETE /events/:id</code></p>
    <p><strong>Description:</strong> Delete an event by its ID.</p>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "Event successfully deleted",
  "event": {
    "id": "event_id",
    ...
  }
}</pre>
    </div>

    <h3>RSVP Management</h3>

    <h4>1. RSVP to an Event</h4>
    <p><strong>Endpoint:</strong> <code>POST /events/:id/rsvp</code></p>
    <p><strong>Description:</strong> RSVP to an event. Limits RSVPs based on the maximum number of attendees.</p>
    <div class="request">
        <strong>Request Body:</strong>
        <pre>{
  "userId": "user_id" // User ID making the RSVP
}</pre>
    </div>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "message": "RSVP successfully recorded",
  "event": {
    "id": "event_id",
    ...
  }
}</pre>
    </div>

    <h4>2. View User's RSVPed Events</h4>
    <p><strong>Endpoint:</strong> <code>GET /rsvp/user/events</code></p>
    <p><strong>Description:</strong> Retrieve all events a user has RSVPed to.</p>
    <div class="response">
        <strong>Response:</strong>
        <pre>{
  "events": [
    {
      "id": "event_id",
      "etitle": "Event Title",
      ...
    }
  ]
}</pre>
    </div>

    <h2>Error Handling</h2>
    <p><strong>Invalid Token:</strong> <code>"message": "Access denied. Token missing."</code></p>
    <p><strong>Unauthorized Access:</strong> <code>"message": "Invalid token"</code></p>
    <p><strong>Server Error:</strong> <code>"message": "Server error", "error": "error_message"</code></p>

    <h2>Model Definitions</h2>

    <h3>User Schema</h3>
    <pre><code>let mongoose = require("mongoose");

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

module.exports = usermodel;</code></pre>

    <h3>Event Schema</h3>
    <pre><code>let mongoose = require("mongoose");

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

module.exports = eventModel;</code></pre>

    <h2>Cloudinary Integration</h2>
    <p>Cloudinary is used for storing event images. Ensure you have configured Cloudinary in your application and use the cloudinary package for uploading and managing images.</p>

    <h3>Cloudinary Configuration</h3>
    <pre><code>const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});</code></pre>

    <h3>Upload Image</h3>
    <pre><code>const uploadImage = (filePath) => {
    return cloudinary.uploader.upload(filePath, { folder: 'events' });
};</code></pre>

    <h3>Delete Image</h3>
    <pre><code>const deleteImage = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
};</code></pre>
</body>
</html>
