import React from 'react';

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  const total = props.parts.reduce((s,p) => {
    return s + p.exercises
  },0)    

  return <p>total of {total} exercises</p>
}

const Part = props =>
  <p>{props.name} {props.exercises}</p>

const Content = props => (
  <div>
    {props.parts.map(part=> <Part key={part.id} name = {part.name} exercises = {part.exercises}/>)}             
  </div>
)


const Course = props => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course