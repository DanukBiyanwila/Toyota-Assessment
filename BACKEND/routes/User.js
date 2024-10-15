const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});


const upload = multer({ storage: storage }).single('disabilityFile'); 


router.post('/add', upload, async (req, res) => {
    try {
       
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            disability: req.body.disability,
            mealPlane: req.body.mealPlane,
            dayReq: req.body.dayReq,
            adress: req.body.adress,
            deliveryInstruction: req.body.deliveryInstruction,
            tp_num: req.body.tp_num,
            sec_tp_num: req.body.sec_tp_num,
            email: req.body.email,
            document: req.file ? req.file.path : null, 
        });

       
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
});

module.exports = router; 
