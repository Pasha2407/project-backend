const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");
const ingredientModal = require("../../models/schemas/ingredient");

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

  const { adult } = await userModel.findById(id);
  let alc = "";
  if (adult) alc = alcoholic;
  else alc = "Non alcoholic";

  const mappedIngredients = await Promise.all(
    ingredients.map(async (item) => {
      const ingredient = await ingredientModal.findOne({ title: item.title });
      return {
        title: item.title,
        measure: item.measure,
        ingredientId: ingredient ? ingredient._id : null,
      };
    })
  );

  const newRecipe = {
    drink,
    drinkThumb: '',
    shortDescription,
    category,
    glass,
    alcoholic: alc,
    ingredients: mappedIngredients.filter(
      (ingredient) => ingredient.ingredientId
    ),
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
        { drinkThumb: uploadedAvatar.url },
        { new: true });

      res.status(201).json(updateResult);
    }
  }
  else res.status(201).json(resultRepice);
}
module.exports = addMy;
