'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Order');

exports.create = async (data) => {
    var model = new Model(data);
    await model.save();
};

exports.get = async () => {
    return await Model.find({},'number status customer items')
        .populate('customer','name')
        .populate('items.product', 'title');

};