import { httpService } from "./http.service";
export const orderService = {
    save,
    query,
    remove
}

function save(order) {
    if (order._id) {
        return httpService.put('order', order);
    } else {
        delete order._id
        return httpService.post('order', order)
    }
}

function query(filterBy) {
    const { _id, type } = filterBy
    if (type === 'user') {
        return httpService.get(`order?user=${_id}`);
    } else {
        return httpService.get(`order?host=${_id}`);
    }
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}