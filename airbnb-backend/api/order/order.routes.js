const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getOrders, getOrderById, addOrder, updateOrder, removeOrder } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', requireAuth, getOrders)
router.get('/:id', requireAuth, getOrderById)
router.post('/', requireAuth, addOrder)
router.put('/', requireAuth, updateOrder)
router.delete('/:id', requireAuth, removeOrder)
// router.post('/', requireAuth, requireAdmin, addOrder)
// router.put('/', requireAuth, requireAdmin, updateOrder)


module.exports = router