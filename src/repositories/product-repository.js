'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    return await Product
        .find({
            active: true
        }, 'title price slug');
};
exports.getBySlug = async (slug) => {
    return await Product
        .find({
            slug: slug, active: true
        }, 'title description price slug tags');

};

exports.getById = async (id) => {
    return await Product.findById(id);
};

exports.getByTags = async (tag) => {
    return await Product
        .find({ tags: tag, active: true }, 'title description price slug tags');

};

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
};
exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
};