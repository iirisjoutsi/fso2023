import { useState } from 'react'

const Button = (props) => {

  const handleClick = props.onClick

  return (
    <button onClick={handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good * 2 + props.bad * -1) / all
  const posi = String(props.good / all * 100).concat("%")
  
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
          <th></th>
          <th></th>
          </tr>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avg}/>
          <StatisticLine text="positive" value={posi}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text={"good"}/>
        <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
        <Button onClick={() => setBad(bad + 1)} text={"bad"}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App