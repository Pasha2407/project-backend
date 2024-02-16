const express = require("express");
const router = express.Router();

const wrapper = require("../../helpers/wrapper");
const method = require("../../controllers/drinks");
const { validateToken } = require("../../middlewares");

router.get("/mainpage", validateToken, wrapper(method.getMainPage));

router.get("/popular", validateToken, wrapper(method.getPopular));

router.get("/search", validateToken, wrapper(method.search));

router.get("/:id", validateToken, wrapper(method.getById));

router.post("/own/add", wrapper(method.addMy));

router.delete("/own/remove/:id", wrapper(method.removeMy));

router.get("/own", wrapper(method.getMy));

router.post("/favorite/add", wrapper(method.addFavorite));

router.delete("/favorite/remove/:id", wrapper(method.removeFavorite));

router.get("/favorite", wrapper(method.getFavorite));

module.exports = router;
