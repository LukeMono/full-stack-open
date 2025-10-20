import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...Object.values(votes))
  const indexOfMaxVotes = Object.values(votes).indexOf(maxVotes)

  return (
    <>
      <AnecdoteChoice text="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleRandom} text="next anecdote" />
      <AnecdoteChoice text="Anecdote with most votes" anecdote={anecdotes[indexOfMaxVotes]} votes={maxVotes} />
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>)
}

const AnecdoteChoice = ({text, anecdote, votes}) => {
  return (
    <div>
      <h1>{text}</h1>
      <div>
        {anecdote}
      </div>
      <div>
        has {votes} votes
      </div>
    </div >
  )
}

export default App