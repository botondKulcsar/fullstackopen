import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setMessage, removeMessage } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const savedAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(savedAnecdote))
        dispatch(setMessage(`you created: '${savedAnecdote.content}'`))
        setTimeout(() => dispatch(removeMessage()), 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm