'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title price slug');
};
exports.getBySlug = (slug) => {
    return Product
        .find({
            slug: slug, active: true
        }, 'title description price slug tags');

};

exports.getById = (id) => {
    return Product.findById(id);

};

exports.getByTags = (tag) => {
    return Product
        .find({ tags: tag, active: true }, 'title description price slug tags')

};