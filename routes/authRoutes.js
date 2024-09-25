const express = require("express");
const { registerUser, loginUser, getUserProfile, checkAdminAccess, getAllUsers, deleteUser } = require("../controller/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, getUserProfile);

router.get("/admin*", verifyToken, isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome to The Admin Dashboard..." });
});

router.get("/check-admin", verifyToken, checkAdminAccess);

router.get("/users",verifyToken,isAdmin,getAllUsers)

router.delete("/users/:id",verifyToken,isAdmin,deleteUser)

module.exports = router;
