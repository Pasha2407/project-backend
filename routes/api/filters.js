const express = require("express");
const router = express.Router();

const { wrapper } = require("../../helpers");
const method = require("../../controllers/filters");

router.get("/categories", wrapper(method.getCategories));

router.get("/ingredients", wrapper(method.getIngredients));

router.get("/glasses", wrapper(method.getGlasses));

module.exports = router;
