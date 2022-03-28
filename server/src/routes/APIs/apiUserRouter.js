const express = require("express");
const router = express.Router();

const {
    createUser, 
    readAllUser,
    readOneUser, 
    updateUser, 
    deleteUser,
    getLogin,
    processLogin,
    processLogOut,
    getRegister,
    processVerifyToken,
    refreshToken
} = require("../../controllers/APIs/apiUserController");

const {
    verifyToken
} = require("../../middlewares/loginMiddleware");

router.post("/register/new", createUser);
router.post("/all", readAllUser);
router.post("/login/session", processLogin);
router.post("/refresh", refreshToken);
router.post("/logout", verifyToken, processLogOut);
router.post("/:id", readOneUser);
router.put("/:id/update", updateUser);
router.get("/login", getLogin);
router.post("/", verifyToken, processVerifyToken);
router.get("/register", getRegister);
router.delete("/:id/destroy", deleteUser);

module.exports = router;