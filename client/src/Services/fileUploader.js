/*const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "turkiskander",
    api_key: "753499652776954",
    api_secret: "mBEa-hBVWw5ph5ckXWgrd3MkvqQ"
});

export const uploadVideo = async (file) => {
    await cloudinary.uploader.upload(
      file, 
      {
        resource_type: 'video',
        public_id: "Internship/Videos/"+ file.substring(0, file.indexOf('.')),
      }
      ).then((uploadResult) => {
        return uploadResult.secure_url;
      }).catch((error) => {
        throw new Error('Error uploading file.');
      })
}

*/