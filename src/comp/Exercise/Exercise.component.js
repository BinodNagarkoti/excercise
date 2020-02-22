import Input from '../Input/Input'
const Exercise = props => {
    return (
      <tr key={props._id}>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.split('T')[0]}</td>
        <td>
          <Input
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
  export default Exercise