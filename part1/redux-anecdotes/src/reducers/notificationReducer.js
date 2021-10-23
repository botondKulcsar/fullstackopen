const reducer = (state = 'initial', action) => {
    console.log(state);
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
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

export default reducer