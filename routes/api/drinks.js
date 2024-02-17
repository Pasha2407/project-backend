const express = require("express");
const router = express.Router();

const wrapper = require("../../helpers/wrapper");
const method = require("../../controllers/drinks");

const { validateSchema } = require('../../middlewares/index')
const { addMyJoiSchema } = require('../../models/joiSchemas/drink')

router.get("/mainpage", wrapper(method.getMainPage));

router.get("/popular", wrapper(method.getPopular));

router.get("/search", wrapper(method.search));

router.get("/:id", wrapper(method.getById));

router.post("/own/add", validateSchema(addMyJoiSchema), wrapper(method.addMy));

router.delete("/own/remove/:id", wrapper(method.removeMy));

router.get("/own", wrapper(method.getMy));

router.post("/favorite/add", wrapper(method.addFavorite));

router.delete("/favorite/remove", wrapper(method.removeFavorite));

router.get("/favorite", wrapper(method.getFavorite));

module.exports = router;
