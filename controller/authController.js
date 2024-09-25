const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User Already Exist..." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await user.save();

        return res.status(201).json({ message: "User Registered successfully..." });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credential..." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credential..." });
        }

        const tokenPayload = { id: user._id, isAdmin: user.isAdmin };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const getUserProfile = async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  const checkAdminAccess = (req, res) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied" });
    }
    res.status(200).json({ message: "Welcome to The Admin Dashboard..." });
  };
  
const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().select("-password");
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

const deleteUser = async(req,res)=>{
    const {id} = req.params;

    try{
        const user = await User.findByIdAndDelete(id);

        if(!user)
        {
            return res.status(404).json({message:"User Not Found..."})
        }
        res.status(200).json({message:"User Deleted Successfully..."})
    }catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    checkAdminAccess,
    getAllUsers,
    deleteUser
};
