import React, { Component } from 'react'
import Exercise from '../../comp/Exercise/Exercise.component'
export default class ExerciseList extends Component{

render(){
    return (

        <div>
        <p> You are on the Exercises List Components</p>
        <br />
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{this.listOfExecercise()}</tbody>
        </table>
      </div>
    )
}
}