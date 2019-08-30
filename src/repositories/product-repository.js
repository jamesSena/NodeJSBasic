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

exports.create = (data) => {
    var product = new Product(data);
    product.save();
};
exports.update = (id, data) => {
    Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
};