import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)


  const handleLeft = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(left + right +1)
  }

  const handleRight = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right +1)
  }

  console.log(total)
  
  return (
    <div>
      {left}
      <Button onClick={handleLeft} text="left" />
      <Button onClick={handleRight} text="right" />
      {right}

      <p>{allClicks.join(' ')}</p>
      <p>{total}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>)
}

export default App