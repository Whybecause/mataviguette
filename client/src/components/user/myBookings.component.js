import React, { Component } from 'react';
import BookingList from '../admin/BookingList';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { trackPromise } from 'react-promise-tracker';
const API_URL = "/api/test/bookings/manage";

export default class UserBookings extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            message:"",
            successful: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUserBookings();
    }

    getUserBookings() {
        trackPromise (
        axios
            .get(API_URL, { headers: authHeader() })
            .then(res => {
                if (this._isMounted) {
                    this.setState({ data: res.data, successful: false
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    message: err.response.data.message,
                    successful : true
                })
            }));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>                            
                <div className="container">
                    <BookingList
                        data={this.state.data}
                    />
                </div>
                {this.state.successful && (
                <div className="container">
                    <p className="alert alert-danger m-top-5 w-50">
                        {this.state.message}
                    </p>
                </div>
                )}
            </div>
        );
    }
}