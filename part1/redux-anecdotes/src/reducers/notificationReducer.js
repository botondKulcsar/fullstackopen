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

export const setMessage = (message, seconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_MESSAGE',
            message
        })
        setTimeout(() => dispatch(removeMessage()), seconds * 1000)
    }
}


export default reducer