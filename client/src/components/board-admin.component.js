import React, { Component } from "react";
import UserService from "../services/user.service";
import RentalBox from './admin/RentalBox';
import BookingBox from './admin/BookingBox';

export default class BoardAdmin extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }



  componentDidMount() {
    this._isMounted = true;
    UserService.getAdminBoard().then(
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
        <div className="container m-top-1 ">
          <header className="card bg-white d-flex text-center">
            <h3>{this.state.content}</h3>
          </header>
        </div>
        <RentalBox/>
        <BookingBox/>
      </div>
    );
  }
}