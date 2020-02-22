import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        };
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChanageDate = this.onChanageDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios
            .get(
                "http://localhost:5000/exercises/" + this.props.match.params.id
            )
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                });
            })
            .catch(err => console.log("Error:" + err));
        axios.get("http://localhost:5000/users/").then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username)
                });
            }
        });
    }
    onChangeEvent(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    onChanageDate(date) {
        this.setState({
            date: date
        });
    }
    onSubmit(event) {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };
        axios
            .post(
                "http://localhost:5000/exercises/update/" +
                    this.props.match.params.id,
                exercise
            )                   
            .then(res => {
                console.log(res.data);
                this.setState({
                    ...this.state,
                    Error: {
                        duplicate: false
                    }
                });
            })
            .catch(err => {
                console.log("Duplicate data" + err);
                this.setState({
                    ...this.state,
                    Error: {
                        duplicate: true
                    }
                });
            });
        console.log(exercise);
        window.location = "/";
    }

    render() {
        return (
            <div>
                <p> You are on the Create Exercises Components</p>
                <h3> Edit Exercises Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> UserName: </label>
                        <select
                            ref="userInput"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeEvent}
                        >
                            {this.state.users.map(function(user) {
                                return (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeEvent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input
                            className="form-control"
                            type="Number"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChangeEvent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker
                                name="date"
                                selected={this.state.date}
                                onChange={this.onChanageDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Edit Exercise Log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
