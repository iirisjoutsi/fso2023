import { useState } from 'react'

const Button = (props) => {

  const handleClick = props.onClick

  return (
    <button onClick={handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  console.log(points)
  const anecdoteOnClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteOnClick = () => { 
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const bestIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <Button onClick={voteOnClick} text={"vote"} />
        <Button onClick={anecdoteOnClick} text={"next anecdote"} />
      </div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[bestIndex]}
      <div>has {points[bestIndex]} votes</div>
    </div>
  )
}

export default App