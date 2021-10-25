const reducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'REMOVE_MESSAGE':
            return ''
        default:
            return state
    }
}

const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

let timeout;
export const setMessage = (message, seconds) => {
    return async (dispatch) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => dispatch(removeMessage()), seconds * 1000)
        
        dispatch({
            type: 'SET_MESSAGE',
            message
        })
    }
}


export default reducer