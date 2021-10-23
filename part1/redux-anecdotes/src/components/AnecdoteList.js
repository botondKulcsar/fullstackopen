import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const Anecdote = ({ content, votes, handleClick }) => {
    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter) {
            return state.anecdotes.filter(a =>
                a.content.toLowerCase().includes(state.filter))
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(setMessage(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        content={anecdote.content}
                        votes={anecdote.votes}
                        handleClick={() => vote(anecdote)}
                    />
                )}
        </>
    )

}

export default AnecdoteList