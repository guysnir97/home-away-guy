import { socketService } from "../services/socket.service"
import { userService } from "../services/user.service"

const initialState = {
    users: [],
    loggedInUser: checkLoggedinUser(),
    msg: null,
    notifications: userService.getLoggedinUser()?.notifications || { 'trips': 0, 'orders': 0 },
    
}


export function userReducer(state = initialState, action) {

    switch (action.type) {

        case 'SET_USER':
            return { ...state, loggedInUser: action.user }
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.user] }
        case 'UPDATE_USER':
            return { ...state, loggedInUser: action.user }
        case 'UPDATE_NOTIFICATION':
            return { ...state, notifications: action.notifications }
        case 'SET_MSG':
            return { ...state, msg: action.msg }
        default: return { ...state }
    }

}

function checkLoggedinUser() {
    const user = userService.getLoggedinUser() || null
    if (user) {
        socketService.emit('on-login', user._id)
    }
    return user
}
