const Articles = require("../model/articles");

//Get all Method
const getAll = async (req, res) => {
    try {
        const data = await Articles.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get by Category AND Title Method
const catTitle = async (req, res) => {
    try {
        const data = await Articles.findOne({category: req.params.category, metaTitle: req.params.metaTitle});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Search By Filter / Title Method
const findByTitle = async (req, res) => {
    try {
        const data = await Articles.find({metaTitle: new RegExp(req.body.metaTitle, 'i') });
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Sort by Property Method
const sortByProperty = async (req, res) => {
    let sortParam  = req.body.sortParam;
    let order = req.body.order;
    try {
        const data = await Articles.find({}).sort({[sortParam]: order});
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAll,
    catTitle,
    findByTitle,
    sortByProperty
}