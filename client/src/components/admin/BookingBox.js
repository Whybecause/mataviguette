import React, { Component } from "react";
import BookingList from './BookingList';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import formContactService from '../../services/formContact.service';
import { trackPromise } from 'react-promise-tracker';
import AuthService from '../../services/auth.service';


const API_URL = "/api/test/bookings/all";

export default class bookings extends Component {
    _isMounted= false;
    constructor(props) {
        super(props);
        this.onChangeMessage= this.onChangeMessage.bind(this);
        this.handleContactBooker= this.handleContactBooker.bind(this);
        this.alert = 0;
        this.state = {
            data: [],
            error: null,
            days: '',
            startAt: '',
            endAt: '',
            totalPrice: '',
            guests: '',
            user: '',
            rental: '',
            createDate: '',
            message: '',
            alert: '',
            loading: false,
            successful: false,
            showAdminBoard: false,
            isValidToken: ''
        }
    }

    resetForm() {
        this.setState({name: '', email: '', message: ''});
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleContactBooker(id) {
        const message = {
            message: this.state.message
        } 
        this.setState({
            alert: '',
            successful: false,
            loading: true
        });
        formContactService.sendEmailToBooker(message, id)
        .then(res => {
            this.setState({
                alert: res.data.message,
                successful: true,
                loading: false
            });
            this.resetForm();
            this.alert = setTimeout( () => {
                this.setState({ alert: ''});
                this.alert = 0;
            }, 2000)
        },
        error => {
             this.setState({
                 alert: error.response.data.message,
                 successful: false
             })
        })
        .catch( (err) => {
            console.log(err);
        })
        
    }

    handleDeleteBooking = (startAt) => {
        const i = this.state.data.findIndex(c => c.startAt === startAt);
        const data = [
            ...this.state.data.slice(0, i),
            ...this.state.data.slice(i + 1),
        ];
        this.setState({ data });
        axios.delete(`/api/test/booking/delete/${startAt}`, { headers: authHeader() })
        .then (res => {
            this.setState({ data})
        })
        .catch( (error) => {
            console.log(error)
        })
    }
    componentDidMount() {
        this._isMounted=true;
        this.getBookingsData();
        const user = AuthService.getCurrentUser();
        if (user) {
            if (this._isMounted) {
            this.setState({
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
            }
        }

    }

    UNSAFE_componentWillUnmount() {
        clearTimeout(this.alert);
        this._isMounted= false;
    }

    getBookingsData() {
        trackPromise (
        axios
            .get(API_URL, { headers: authHeader() })
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch((error) => {
                console.log(error)
            }));
    }

    render() {
        return (
        <div className="container">
            <BookingList
                data={this.state.data}
                message={this.state.message}
                onChangeMessage={this.onChangeMessage}
                handleContactBooker={this.handleContactBooker}
                alert={this.state.alert}
                className={this.state.successful}
                loading={this.state.loading}
                showAdminBoard={this.state.showAdminBoard}
                handleDeleteBooking={this.handleDeleteBooking}
            />
        </div>
        );
    }
}