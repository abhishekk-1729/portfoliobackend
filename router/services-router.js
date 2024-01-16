const express = require("express")
const router = express.Router();
const  servicesController = require("../controllers/servicesController")

router.route("/getServices").get(servicesController);

module.exports = router;