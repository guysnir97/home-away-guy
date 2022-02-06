// const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const demoStays = require('./demoData')

async function query(filterBy) {
    try {

        const criteriaFilter = _buildCriteriaFilter(filterBy)
        console.log('criteria', criteriaFilter);
        // const criteriaSort = _buildCriteriaSort(filterBy)
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteriaFilter).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }

}

function _buildCriteriaFilter(filterBy) {
    let criteria = {}

    if (filterBy.address) {
        criteria = { 'loc.city': { $regex: new RegExp(filterBy.address, 'i') } }
    }

    if (filterBy.host) {
        criteria = ({ 'host': filterBy.host })
    }

    console.log('criteria --- ', criteria);
    return criteria
}




function _buildCriteriaSort(filterBy) {
    switch (filterBy.sort) {
        case 'priceOrderUp':
            return { price: 1 }
        case 'priceOrderDown':
            return { price: -1 }
        case 'createdAtOrderUp':
            return { createdAt: 1 }
        case 'createdAtOrderDown':
            return { createdAt: -1 }
        case 'nameOrderUp':
            return { name: 1 }
        case 'nameOrderDown':
            return { name: -1 }
    }
}


async function getById(stayId) {
    console.log(stayId, 'stay');
    try {
        const collection = await dbService.getCollection('stay')
        const stay = await collection.findOne({ '_id': ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ '_id': ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}


async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}
async function update(stay) {
    console.log('stay', stay);
    try {
        var id = ObjectId(stay._id)
        delete stay._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ "_id": id }, { $set: {...stay } })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

// function _buildCriteria(filterBy) {

// }
// try {
//     demoStays.forEach(stay => {
//        x add(stay)
//     })  
// console.log('hello');
// demoStays.forEach(stay => {
//     try {
//         add(stay)
//         console.log('hi');
//         console.log(stay);
//     } catch (err) {
//         console.log('err', err);
//     }
// })