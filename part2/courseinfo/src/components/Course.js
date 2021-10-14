import React from "react";

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
      <b>total of {sum} exercises</b>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    const partList = parts.map((part, i) => <Part key={part.name + i} name={part.name} exercises={part.exercises} />)
    return (
      <div>
        {partList}
      </div>
    )
  }
  
  const Course = ({ course }) => (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )

export default Course