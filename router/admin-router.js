const express = require("express")
const router = express.Router();
const {getAllUsers,getAllContacts,deleteUser,getUserById,deleteContact,getContactById,addService,updateContact,updateUser} = require("../controllers/admin-controller")
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,getUserById);
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,updateUser);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUser);
router.route("/contacts").get(authMiddleware,adminMiddleware,getAllContacts);
router.route("/contacts/:id").get(authMiddleware,adminMiddleware,getContactById);
router.route("/contacts/update/:id").patch(authMiddleware,adminMiddleware,updateContact);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,deleteContact);
router.route("/service").post(authMiddleware,adminMiddleware,addService);

module.exports = router;