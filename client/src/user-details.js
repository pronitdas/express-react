import React, { Component } from "react";

export class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      skills: [],
      age: 0
    };
  }

  // Implement Axios Logic for save
  handleSubmit(){

  }

  // Individual 
  handleChange(e) {
    let paramName = e.target.name;
    let paramvalue = e.target.value;

    if (paramName !== "skills") {
      this.setState({ paramName: paramvalue });
    } else {
      let skills = this.state.skills.concat(paramvalue);
      this.setState({ skills });
    }
  }

  render() {
    const { isSignup, isEdit } = this.props;
    const { name, email, password, skills, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            onChange={this.handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div class="form-group form-group-inline">
          <input type="file" class="form-control-file" id="profilePicture" />
        </div>
        <div>
          <label for="age">Age</label>
          <input
            type="number"
            class="form-control"
            id="age"
            onChange={this.handleChange}
            placeholder="Enter Age"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default UserDetail;
