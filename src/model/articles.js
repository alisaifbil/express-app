const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    metaTitle: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    ogImage: {
        required: true,
        type: String
    },
    canonicalUrl: {
        required: true,
        type: String
    },
    ogUrl: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    publishedOn: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('Articles', articleSchema)