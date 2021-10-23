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

export const setMessage = message => {
    return {
        type: 'SET_MESSAGE',
        message
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default reducer