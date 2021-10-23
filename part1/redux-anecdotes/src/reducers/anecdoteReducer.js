import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: savedAnecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
    const savedAnecdote = await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: savedAnecdote
    })
  }
}


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
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
          return action.data
        }
        return anecdote
      })
      return newState
    default:
      return state
  }
}

export default reducer