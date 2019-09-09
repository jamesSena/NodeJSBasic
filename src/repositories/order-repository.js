'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Order');

exports.create = async (data) => {
    var model = new Model(data);
    await model.save();
};

exports.get = async () => {
    return await Model.find({}).populate('customer');
};

exports.getBySlug = async (slug) => {
    return await Model
        .find({
            slug: slug, active: true
        }, 'title description price slug tags');

};

exports.getById = async (id) => {
    return await Model.findById(id);
};

exports.getByTags = async (tag) => {
    return await Model
        .find({ tags: tag, active: true }, 'title description price slug tags');

};


exports.update = async (id, data) => {
    await Model.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
};