var express = require("express");
var router = express.Router();
var userRoute = require("../controller/userController");

router.route("/")
.get(userRoute.getAllUsers)
.post(userRoute.createUser)

router.route("/:id")
.get(userRoute.getUser)
.patch(userRoute.updateUser)
.delete(userRoute.deleteUser)

module.exports = router;