const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../model/individualModel');
const npoModel=require("../model/npoModel")
exports.authenticate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: 'Access denied, authorization required' });
        }

        const token = auth.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: 'Token missing or invalid' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); 

        let user
        user=await userModel.findById(decoded.id)
           if(!user){
            user= await npoModel.findById(decoded.id)
           }
        if(!user){
            return res.status(404).json({message:`oops,seems you are passing the wrong id for either npo or individual`})
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: `Authentication error: ${error.message}` });
    }
};


exports.authenticateAdmin = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(400).json({message:`user not found`})
        }
        if (req.user.role ==="admin") {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized:only admin can perform this action" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.authenticateindividual = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(400).json({message:`user not found`})
        }
        if (req.user.role === "individual") {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized:no individual access" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
