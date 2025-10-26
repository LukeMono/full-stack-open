
const Course = ({ name, parts }) => {
  return (
    <>
      <Header name={name} />
      <Part parts={parts} />
      <p style={{fontWeight:'bold'}}>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</p>
    </>
  )
}
const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ parts }) => {
  return (
    <>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)}
    </>
  )
}

export default Course