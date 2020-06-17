import React, { Component } from "react";
import UserBookings from './user/myBookings.component';
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    UserService.getUserBoard().then(
      response => {
        if (this._isMounted) {
          this.setState({
            content: response.data
          });
        }
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <div>
        <div className="container m-top-3">
          <header className="d-flex text-center">
            <h3><strong>{this.state.content}</strong></h3>
          </header>
        </div>
        <UserBookings/>
      </div>
    );
  }
}