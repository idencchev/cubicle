const Cube = require('../models/Cube');

async function getAll(query) {
    let result = Cube.find({});

    if (query.search) {
        result = await Cube.where('name').equals(query.search.toLowerCase());
    }

    if (query.from) {
        result = await Cube.where('difficultyLevel').gte(query.from);
    }

    if (query.to) {
        result = await Cube.where('difficultyLevel').lte(query.to);
    }
    return result;
}

function getOne(id) {
    return Cube.findById(id);
}

 function createData(data, user) {
        let cube = new Cube({ ...data, creatorId: user.id });
        return cube.save();
}

function editData(id, data) {
    return Cube.updateOne({ _id: id }, data);
}

function deleteData(id) {
    return Cube.deleteOne({ _id: id });
}

module.exports = {
    createData,
    getAll,
    getOne,
    editData,
    deleteData
};