const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = async (file, folder, category, quality) => {
    const option = { folder: `Hotel-Management-App/${folder}/${category}/` }
    if (quality) {
        option.quality = quality;
    }
    option.public_id = `image_${Date.now().toString()}`;
    option.type = 'private';
    option.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, option);
}

const deleteFromCloudinary = async (files) => {
    return cloudinary.api.delete_resources(files);
}

const getPublicIdFromUrl = (url) => {
    const parts = url.split("/");

    const filename = parts[parts.length - 1];

    const public_id = filename.split(".")[0];

    return public_id;
};

exports.uploadToCloudinary = uploadToCloudinary;
exports.deleteFromCloudinary = deleteFromCloudinary;
exports.getPublicIdFromUrl = getPublicIdFromUrl;