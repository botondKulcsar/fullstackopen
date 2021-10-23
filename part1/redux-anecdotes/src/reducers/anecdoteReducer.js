export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}


export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  
  switch (action.type) {
    case 'INIT_ANECDOTES':
        return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const newState = state.map(anecdote => {
        if (anecdote.id === action.data.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      return newState
    default:
      return state
  }
}

export default reducer