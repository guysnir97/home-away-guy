// const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId



async function query(filterBy) {

    try {
        const criteriaFilter = _buildCriteriaFilter(filterBy)
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteriaFilter).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}
function _buildCriteriaFilter(filterBy) {
    if (filterBy.user) {
        criteria = { 'buyer._id': filterBy.user }
    } else {
        criteria = { 'host': filterBy.host }
    }
    return criteria
}

// function _buildCriteriaSort(filterBy) {
//     switch (filterBy.sort) {
//         case 'priceOrderUp': return { price: 1 }
//         case 'priceOrderDown': return { price: -1 }
//         case 'createdAtOrderUp': return { createdAt: 1 }
//         case 'createdAtOrderDown': return { createdAt: -1 }
//         case 'nameOrderUp': return { name: 1 }
//         case 'nameOrderDown': return { name: -1 }
//     }
// }

async function getById(orderId) {
    console.log(orderId, 'order');
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
        console.log('remove',orderId);
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ '_id': ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        const addedOrder = await collection.insertOne(order)
        return addedOrder
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    console.log('order', order);
    try {
        const orderToSave = { ...order, _id: ObjectId(order._id) }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ "_id": orderToSave._id }, { $set: orderToSave })
        return order
    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
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

function _buildCriteria(filterBy) {

}


