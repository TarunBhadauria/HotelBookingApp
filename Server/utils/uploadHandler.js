const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = async(file, folder, category, quality)=>{
    const option = { folder: `Hotel-Management-App/${folder}/${category}/` }
    if(quality){
        option.quality = quality;
    }
    option.public_id = `image_${Date.now().toString()}`;
    option.type = 'private';
    option.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, option);
}

const deleteFromCloudinary = async(files)=>{
    return cloudinary.api.delete_resources(files);
}

module.exports = uploadToCloudinary;
module.exports = deleteFromCloudinary;