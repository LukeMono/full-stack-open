import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGood = () => {
    console.log(good)
    return (setGood(good + 1))
  }

  const HandleNeutral = () => setNeutral(neutral + 1)
  const HandleBad = () => setBad(bad + 1)

  return (
    <>
      <Heading />
      <Button onClick={HandleGood} text="good" />
      <Button onClick={HandleNeutral} text="neutral" />
      <Button onClick={HandleBad} text="bad" />
      <h1>Statistics</h1>
      <Statistics countGood={good} countNeutral={neutral} countBad={bad} />
    </>
  )
}

const Heading = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Statistics = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  const average = ((countGood - countBad) / total).toFixed(1)
  const positive = ((countGood / total) * 100).toFixed(1) + " %"

  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  else return (
    <>
      <table>
        <tbody>
          <StatisticsLine text="Good:" value={countGood} />
          <StatisticsLine text="Neutral:" value={countNeutral} />
          <StatisticsLine text="Bad:" value={countBad} />
          <StatisticsLine text="All:" value={total} />
          <StatisticsLine text="Average:" value={average} />
          <StatisticsLine text="Positive:" value={positive} />
        </tbody>
      </table >
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td> {value}</td></tr>
  )
}

export default App