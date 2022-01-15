const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

function createAccessory(data) {
    let accessory = new Accessory(data);
    return accessory.save((err) => {
        console.log(err);
    });
}

async function getAllAccessories() {
    return await Accessory.find({});
} 

async function attachAccessory(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    return cube.save((err) => {
        console.log(err);
    });
} 

function getWithAccsesories(accessoryId) {
    return Cube.findById(accessoryId).populate('accessories');
}

function filterAccssesories(ids) {
    return Accessory.where('_id').nin(ids);
}

module.exports = {
    createAccessory,
    getAllAccessories,
    attachAccessory,
    getWithAccsesories,
    filterAccssesories
};