import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            Error: { duplicate: "" }
        };
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeEvent(event) {
        const { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }
    onSubmit(event) {
        event.preventDefault();
        const user = {
            username: this.state.username
        };
        console.log(user);
        axios
            .post("http://localhost:5000/users/add", user)
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
        this.setState({
            username: ""
        });
    }
    render() {
        return (
            <div>
                <p> You are on the Create user Components</p>

                {this.state.Error.duplicate ? (
                    <div className="alert alert-danger" role="alert">
                        <strong>Duplicate Username</strong> Try Another One!!!
                    </div>
                ) : (
                    <strong> User Added Sucessfully </strong>
                )}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> UserName: </label>
                        <input
                            type="text"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeEvent}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Exercise Log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
