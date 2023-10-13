const express = require("express");

const { isAuthenticated } = require("../middleweres/userAuth");
const { searchUser } = require("../controllers/searchController");

const router = express.Router();

router.route("/search").get(isAuthenticated, searchUser);

module.exports = router;
