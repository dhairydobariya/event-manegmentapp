const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'event_images', 
            allowed_formats: ['jpg', 'png', 'jpeg'], 
            public_id: file.originalname.split('.')[0] 
        };
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
