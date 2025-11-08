const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'diagnostic_reports',
        allowedFormats: ['pdf'],
        resource_type: 'raw',
        public_id: (req, file) => {
            return file.originalname;
        }
    },
});

module.exports = { cloudinary, storage };