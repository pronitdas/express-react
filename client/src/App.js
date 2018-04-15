import React, { Component } from "react";

import {
  FormGroup,
  Form,
  Row,
  Col,
  FormControl,
  Button,
  ControlLabel,
  HelpBlock,
  Badge,
  Glyphicon,
  DropdownButton,
  MenuItem,
  Image,
  Media,
  Navbar,
  Nav,
  NavItem,
  NavDropdown
} from "react-bootstrap";
import Game from "./game";
import UserDetail from "./user-details";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      value: "",
      isEdit: false,
      isSignUp: false,
      isLogin: false,
      isGame: true
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handlePageChange(page) {
    if (page === "game") {
      this.setState({ isEdit: false, isSignUp: false });
    }
    if (page === "edit") {
      this.setState({ isEdit: true, isSignUp: false });
    }
    if (page === "signup") {
      this.setState({ isEdit: false, isSignUp: true });
    }
  }
  async login() {
    const response = await fetch("http://localhost:5000/api/v1/auth", {});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ isLogin: true });
  }

  async logout() {
    const response = await fetch("http://localhost:5000/api/v1/logout", {});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ isLogin: false });
  }

  render() {
    const { isSignUp, isEdit, isLogin } = this.state;
    return (
      <div className="App">
        <header className="App-Header">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">Ocd - Cards</a>
              </Navbar.Brand>
            </Navbar.Header>
            {isLogin ? (
              <Nav>
                <NavItem onClick={() => this.handlePageChange("game")} href="#">
                  Game
                </NavItem>
                <NavItem onClick={() => this.handlePageChange("edit")} href="#">
                  Edit
                </NavItem>
                <NavItem
                  onClick={this.logout}
                  href="#"
                  pullRight
                >
                  logout
                </NavItem>
              </Nav>
            ) : (
              <Nav>
                <NavItem
                  onClick={() => this.handlePageChange("signup")}
                  href="#"
                >
                  Sign Up
                </NavItem>
                <NavItem>
                  <Navbar.Form onSubmit={this.login} role="login" pullRight>
                    <FormGroup>
                      <FormControl
                        controlId="formBasicText"
                        type="text"
                        name="email"
                        value={this.state.user}
                        placeholder="Enter your email"
                      />
                      <FormControl
                        type="text"
                        name="password"
                        value={this.state.value}
                        placeholder="Enter your password"
                      />
                    </FormGroup>
                    <button type="submit" class="btn btn-default">
                      Submit
                    </button>
                  </Navbar.Form>
                </NavItem>
              </Nav>
            )}
          </Navbar>
        </header>
        <div className="App-Body">
          {isSignUp || isEdit ? (
            <UserDetail isEdit isSignUp />
          ) : (
            <Game userId={1} />
          )}
        </div>
        <footer className="App-footer" />
      </div>
    );
  }
}

export default App;
