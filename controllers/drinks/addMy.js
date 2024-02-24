const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const mongoose = require('mongoose');

const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

const { categoriesList, glassesList, alcoholicList,
  categoriesUaList, glassesUaList, alcoholicUaList }
  = require("../../helpers/drinkLists")

async function addMy(req, res) {
  const language = req.user.language;

  const {
    drink,
    shortDescription,
    category,
    glass,
    alcoholic,
    ingredients,
    instructions,
  } = req.body;

  const categoryIndex = language === "en" ?
    categoriesList.indexOf(category) : categoriesUaList.indexOf(category);
  const glassIndex = language === "en" ?
    glassesList.indexOf(glass) : glassesUaList.indexOf(glass);
  const alcoholicIndex = language === "en" ?
    alcoholicList.indexOf(alcoholic) : alcoholicUaList.indexOf(alcoholic);

  const id = req.user.id;
  const adult = req.user.adult;
  const newId = new mongoose.Types.ObjectId();

  let enAlc = "";
  if (adult) enAlc = alcoholicList[alcoholicIndex];
  else enAlc = "Non alcoholic";
  let uaAlc = "";
  if (adult) uaAlc = alcoholicUaList[alcoholicIndex];
  else uaAlc = "Безалкогольний";

  const parsedIngredients = JSON.parse(ingredients);

  const newRecipe = {
    drink,
    drinkThumb: "",
    shortDescription,
    category: categoriesList[categoryIndex],
    glass: glassesList[glassIndex],
    alcoholic: enAlc,
    ingredients: parsedIngredients,
    instructions,
    owner: id,
  };
  const resultEnRecipe = await recipeEnModel.create({ _id: newId, ...newRecipe });
  await resultEnRecipe.save();

  const newUaRecipe = {
    drink,
    drinkThumb: "",
    shortDescription,
    category: categoriesUaList[categoryIndex],
    glass: glassesUaList[glassIndex],
    alcoholic: uaAlc,
    ingredients: parsedIngredients,
    instructions,
    owner: id,
  };
  const resultUaRecipe = await recipeUaModel.create({ _id: newId, ...newUaRecipe });
  await resultUaRecipe.save();

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
      const updateEnResult = await recipeEnModel.findByIdAndUpdate(
        resultEnRecipe._id,
        { drinkThumb: uploadedAvatar.url },
        { new: true }
      );
      const updateUaResult = await recipeUaModel.findByIdAndUpdate(
        resultUaRecipe._id,
        { drinkThumb: uploadedAvatar.url },
        { new: true }
      );

      const updateResult = language === "en" ? updateEnResult : updateUaResult;
      res.status(201).json(updateResult);
    }
  } else {
    const resultRecipe = language === "en" ? resultEnRecipe : resultUaRecipe;
    res.status(201).json(resultRecipe);
  }
}
module.exports = addMy;
