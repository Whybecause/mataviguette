import React, { Component, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { trackPromise } from 'react-promise-tracker';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import authHeader from '../../../services/auth-header';
import BookingService from '../../../services/booking.service';
import PaymentService from '../../../services/payment.service';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import moment from 'moment';
import DatePicker from "react-datepicker";
import { getRangeOfDates } from "../../helpers/index";
import BookingModal from './BookingModal';
import AuthService from "../../../services/auth.service";

const API_URL = "api/test";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

class Booking extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.handleBooking = this.handleBooking.bind(this);
        this.onChangeGuests = this.onChangeGuests.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.message = 0;

        this.state = {
            startAt: new Date(),
            endAt: new Date(),
            guests: "",
            successful: false,
            loading: false,
            message: "",
            user: AuthService.getCurrentUser()
        };  
    }

    getCurrentRental() {
        trackPromise (
        axios.get(API_URL + "/rentals/current")
        .then(res => {
            if (this._isMounted) {
                const id = res.data.id
                const title = res.data.title
                const city = res.data.city
                const street= res.data.street
                const category= res.data.category
                const bedrooms= res.data.bedrooms
                const dailyRate = res.data.dailyRate
                const bookings = res.data.bookings
                this.setState({ id })
                this.setState({ title })
                this.setState({ city})
                this.setState({ street})
                this.setState({ category})
                this.setState({ bedrooms})
                this.setState({ dailyRate})
                this.setState({ bookings})
            }
        })
        .catch ((error) => {
            console.log(error)
        }));
    }

    getGoogleCalBookedEvents = async () => {
        const res = await axios.get(API_URL + "/rentals/booked");
        const data = await res.data;
         const bookedRangeDays = [];
        const addDays = (date, days = 1) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };
        try {
            await Promise.all(
                    data.map(async event => {
                        const getBookedStart = new Date(await event.bookedStart);
                        const getBookedEnd = new Date(await event.bookedEnd);
                        const next = addDays(getBookedStart, 1);
                        bookedRangeDays.push(next, getBookedEnd, getBookedStart);
                    })
            );
        } catch(e) {
            return console.log('No booking dates');
        }
        if (this._isMounted) {
        this.setState({ bookedRangeDays })
        }
    }

    isValidToken() {
        axios.get("api/token", { headers: authHeader() })
        .then(res => {
          if (res.data === true && this._isMounted) {
            this.setState({
              isValidToken: true
            })
          } else {
            localStorage.removeItem("user");
          }
        })
      }

    componentDidMount() {
        this._isMounted = true;
        this.getGoogleCalBookedEvents();
        this.getCurrentRental();
        this.isValidToken();
    }

    UNSAFE_componentWillUnmount() {
        clearTimeout(this.message);
        this._isMounted = false;
    }

    onChangeStart = date => {
        this.setState({
            startAt: date
        });
    };

    onChangeEnd = date => {
        this.setState({
            endAt: date
        });
    };
    onChangeGuests(e) {
        this.setState({
            guests: e.target.value 
        });
    }

    handleBooking = async (e) => {
        e.preventDefault();
        (async () => {
            this.setState({
            message: "",
            successful: false,
            loading: true
        });
            const { stripe, elements} = this.props;
            if (!stripe || !elements) {
                 return;
            }
            const response = await PaymentService.getSecret(this.state.startAt, this.state.endAt, this.state.user.email, this.state.guests)
            const {client_secret: clientSecret} = await response.data;
            const push = await BookingService.createBooking(this.state.startAt, this.state.endAt, this.state.guests) 
            .then( async response => {
                const bookingStart = await response.data.startAt
                const result = await stripe.confirmCardPayment(
                    (clientSecret), 
                    {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: this.state.user.username,
                            email: this.state.user.email
                        }
                    }
                })
                .then(async (result) => {
                    if (result.error) {
                        this.setState({
                            message: result.error.message,
                            loading: false,
                            successful: false
                        })
                        const delBook = await axios.delete(`api/test/booking/delete/${bookingStart}`, {headers: authHeader()})
                        return;
                    } 
                    else {
                        if (result.paymentIntent.status === 'succeeded') {
                            this.setState({
                                message: `Booking successful! Enjoy ! 
                                An email has been sent to ${this.state.user.email}`,
                                loading: false,
                                successful: true
                            })
                            return console.log('success')
                        }
                    }
                })
            }, error => {
              this.setState({
                  message: error.response.data.message,
                  loading: false,
                  successful: false
              })
            })
        })(); 
    }
    
    render() {
        const days = getRangeOfDates(this.state.startAt, this.state.endAt).length -1;
        const totalPrice = this.state.dailyRate * days;
        const { bookedRangeDays, isValidToken } = this.state;

    

        return (
            <div>
                 <div className="card-bodytext-center">
                    <h5 className="card-title ">{this.state.dailyRate}€<span className="p-discret"> par nuit</span></h5>
                    <hr/>
                </div>
                {!isValidToken && (
                    <div>
                    <Link to="/login"> Login to book place </Link>
                    </div>
                )}
                {isValidToken && (
                <Form
                    onSubmit={this.handleBooking}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="dates">Start Date</label>
                            <DatePicker
                                dateFormat={moment(this.state.startAt).format('YYYY-MM-DD')}
                                selected={this.state.startAt}
                                isClearable
                                minDate={new Date()}
                                onChange={this.onChangeStart}
                                className="form-control"
                                customInput={<Input validations={[ required ]}/>}
                                placeholderText="Click to select starting date"
                                excludeDates = {bookedRangeDays}
                                
                                
                            >
                            </DatePicker>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="dates">End Date</label>
                            <DatePicker
                                dateFormat={moment(this.state.endAt).format('YYYY-MM-DD')}
                                selected={this.state.endAt}
                                minDate={new Date()}
                                isClearable
                                placeholderText="Click to select ending date"
                                className="form-control"
                                onChange={this.onChangeEnd}
                                customInput={<Input validations={[ required ]}/>}
                                excludeDates = {bookedRangeDays}
                            >
                            </DatePicker>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guests">Guests</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="guests"
                                value={this.state.guests}
                                onChange={this.onChangeGuests}
                                placeholder="How many people?"
                                validations={[ required ]}
                            />
                        </div>
                    {/* Récapitulatif des infos saisies avant de valider le form */}
                        <div className="form-group">
                            <BookingModal 
                                buttonLabel="Reserve your place now"
                                confirmBooking = {this.handleBooking}
                                startAt = {moment(this.state.startAt).format('YYYY-MM-DD')}
                                endAt= {moment(this.state.endAt).format('YYYY-MM-DD')}
                                guests= {this.state.guests}
                                days = {days}
                                totalPrice = {totalPrice}
                                message= {this.state.message}
                                className={this.state.successful}
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
                )}
                    {/* Affichage du message de validation ou d'erreur en bas du form */}
                    {this.state.message && (
                        <div className="form-group">
                            <div className={this.state.successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                            }
                            role="alert"
                            >
                            {this.state.message}
                            </div>
                        </div>
                    )}
                    {this.state.successful && (
                        <Link to ="/user">See your booking</Link>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
                )}  
                
            </div>
        );
    }
}

export default function InjectedCheckoutForm() {
    return (
      <ElementsConsumer>
        {({stripe, elements}) => (
          <Booking  stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    );
  }