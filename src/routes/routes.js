const express = require('express');
const axios = require("axios").default;
const Articles = require("../model/articles");
const router = express.Router();

//Post Method
// router.post('/post', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//         age: req.body.age
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Articles.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/:category/:metaTitle', async (req, res) => {
    try {
        const data = await Articles.findOne({category: req.params.category, metaTitle: req.params.metaTitle});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Search By Filter / Title
router.get('/findByTitle', async (req, res) => {
    try {
        const data = await Articles.find({metaTitle: new RegExp(req.body.metaTitle, 'i') });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Sort Method
router.get('/sortAll', async (req, res) => {
    let sortParam  = req.body.sortParam;
    let order = req.body.order;
    try {
        const data = await Articles.find({}).sort({sortParam: order});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

module.exports = router;