import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteForAnecdote(id))
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
                        handleClick={() => vote(anecdote.id)}
                    />
                )}
        </>
    )

}

export default AnecdoteList