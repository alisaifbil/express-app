const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article-controller');

//Get all Method
router.get('/getAll', articleController.getAll);

//Get by Cetegory AND Title Method
router.get('/:category/:metaTitle', articleController.catTitle);

//Search By Filter / Title Method
router.get('/findByTitle', articleController.findByTitle);

//Sort by Property Method
router.get('/sortByProperty', articleController.sortByProperty);

//Send Email Method
router.post('/sendEmail', articleController.sendEmail);

module.exports = router;