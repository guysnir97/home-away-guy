import { socketService } from "../services/socket.service";
import { userService } from "../services/user.service";

export function onAddUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.signup(userDetails)
            socketService.emit('on-login', user._id)
            dispatch({ type: 'ADD_USER', user })
            dispatch({ type: 'SET_USER', user })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onSetMsg(msg) {

    return dispatch => {
        dispatch({ type: 'SET_MSG', msg })
        setTimeout(() => {
            dispatch({ type: 'SET_MSG', msg: null })
        }, 12000)
    }
}

export function onSetUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.login(userDetails)
            dispatch({ type: 'SET_USER', user })
            socketService.emit('on-login', user._id)
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onLogout() {
    try {
        return async dispatch => {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onAddNotification(notiType) {
    try {
        return async dispatch => {
            const user = await userService.getLoggedinUser()
            user.notifications[notiType]++
                await userService.update(user)
            const notifications = user.notifications
            dispatch({ type: 'UPDATE_NOTIFICATION', notifications })
            dispatch({ type: 'UPDATE_USER', user })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}
export function onClearNotification(notiType) {
    try {
        return async dispatch => {
            const user = await userService.getLoggedinUser()
            if (!user) return
            user.notifications[notiType] = 0
            await userService.update(user)
            const notifications = user.notifications
            dispatch({ type: 'UPDATE_NOTIFICATION', notifications })
            dispatch({ type: 'UPDATE_USER', user })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}