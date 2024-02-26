const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const recipeModel = require("../../models/schemas/recipe");

async function addMy(req, res) {
  const {
    drink,
    shortDescription,
    category,
    glass,
    alcoholic,
    ingredients,
    instructions,
  } = req.body;

  const id = req.user.id;
  const adult = req.user.adult;

  let alc = "";
  if (adult) alc = alcoholic;
  else alc = "Non alcoholic";

  const parsedIngredients = JSON.parse(ingredients);

  const newRecipe = {
    drink,
    drinkThumb: "",
    shortDescription,
    category,
    glass,
    alcoholic: alc,
    ingredients: parsedIngredients,
    instructions,
    owner: id,
  };
  const resultRepice = await recipeModel.create(newRecipe);
  await resultRepice.save();

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
        width: 400,
        height: 400,
        crop: "fill",
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

    if (uploadedAvatar) {
      const updateResult = await recipeModel.findByIdAndUpdate(
        resultRepice._id,
        { drinkThumb: uploadedAvatar.secure_url },
        { new: true }
      );

      res.status(201).json(updateResult);
    }
  } else res.status(201).json(resultRepice);
}
module.exports = addMy;
