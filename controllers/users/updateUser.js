const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const userModel = require("../../models/schemas/user");

async function updateUser(req, res) {
  const { name } = req.body;
  const { id } = await userModel.findById(req.user.id);

  if (req.file) {
    const { path } = req.file;

    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    const uploadImage = async (path) => {
      const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        width: 100,
        height: 100,
        crop: "fill",
        gravity: "faces",
      };

      try {
        const result = await cloudinary.uploader.upload(path, options);
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    const uploadedAvatar = await uploadImage(path);

    await fs.unlink(path);

    await userModel.findByIdAndUpdate(id, {
      name,
      avatarURL: uploadedAvatar.url,
    });
  } else {
    await userModel.findByIdAndUpdate(id, { name });
  }

  res.json({
    id: id,
    name: name,
  });
}

module.exports = updateUser;
