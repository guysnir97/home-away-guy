import { orderService } from '../services/order.service'

export function onLoadOrders(filterBy) {
    try {
        return async dispatch => {
            const orders = await orderService.query(filterBy)
            dispatch({ type: 'LOAD_ORDERS', orders })
            return orders
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}
export function onAddOrder(orderDetails) {
    try {
        return async dispatch => {
            const order = await orderService.save(orderDetails)
            dispatch({ type: 'SET_ORDERS', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}
export function onUpdateOrder(order) {
    try {
        return async dispatch => {
            dispatch({ type: 'UPDATE_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onUpdateStatusOrder(order) {
    try {
        return async dispatch => {
            await orderService.save(order)
            dispatch({ type: 'UPDATE_STATUS_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}

export function onSetOrder(order) {
    try {
        return async dispatch => {
            dispatch({ type: 'SET_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onRemoveOrder(orderId) {
    return async(dispatch) => {
        try {
            await orderService.remove(orderId)
            dispatch({ type: 'REMOVE_ORDER', orderId })
        } catch (err) {
            console.log('err', err);
            throw err
        }

    }
}
export function onTogglePage() {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE_PAGE' })
        } catch (err) {
            console.log('err', err);
        }
    }

}