import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Exercise = props => {
  return (
    <tr key={props._id}>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.split('T')[0]}</td>
      <td>
        <input
          type="button"
          className="btn btn-danger"
          value="Delete"
          name="delete"
          onClick={() => props.deleteExercise(props.exercise._id)}
        />
      </td>
      <td>
        <Link to={'/edit/' + props.exercise._id}>Edit</Link>
      </td>
    </tr>
  )
}
export default class ExerciseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
    this.listOfExecercise = this.listOfExecercise.bind(this)
    this.deleteExercise = this.deleteExercise.bind(this)
  }

  listOfExecercise() {
    return this.state.exercises.map(currentExrcise => {
      return (
        <Exercise
          exercise={currentExrcise}
          deleteExercise={this.deleteExercise}
          key={currentExrcise._id}
        />
      )
    })
  }
  deleteExercise(id) {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data))
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id),
    })
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/exercises')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch(err => console.log('Error:' + err))
  }

  render() {
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
