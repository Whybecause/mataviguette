import React, { Component } from "react";
import RentalList from './RentalList';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import rentalCRUDService from '../../services/rentalCRUD.service';
import { trackPromise } from 'react-promise-tracker';
import RentalUpdateModal from './rentalUpdateModal';

const API_URL = "/api/test/rentals/manage";

export default class rentals extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeBedrooms = this.onChangeBedrooms.bind(this);
        this.onChangeDailyRate = this.onChangeDailyRate.bind(this);
        this.handleUpdateRental = this.handleUpdateRental.bind(this);
        this.alert = 0;

        this.state = {
            data: [],
            error: null,
            title: '',
            user: '',
            city: '',
            street: '',
            category: '',
            bedrooms: '',
            dailyRate: '',
            createdAt: '',
            alert: '',
            successful: false,
            loading: false,
            showAdminBoard: true
  
        }
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }
    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    }
    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onChangeBedrooms(e) {
        this.setState({
            bedrooms: e.target.value
        });
    }
    onChangeDailyRate(e) {
        this.setState({
            dailyRate: e.target.value
        });
    }

    handleUpdateRental(e) {
        e.preventDefault();
        const data = {
            city: this.state.city,
            street: this.state.street,
            category: this.state.category,
            bedrooms: this.state.bedrooms,
            dailyRate: this.state.dailyRate
        }
        this.setState({
            alert: '',
            successful: false,
            loading: true,
        });
        rentalCRUDService.update(data)
        .then( response => {
            this.setState({
                alert: response.data.message,
                successful: true,
                loading: false,
                data: [response.data.foundRental]
            });
            this.alert = setTimeout( () => {
                this.setState({ alert: ''});
                this.alert = 0
            }, 2000)
        },
        error => {
            const resMessage = error.response.data.message
            this.setState({
                successful: false,
                loading: false,
                alert: resMessage
            });
        })
    }
    componentDidMount() {
        this._isMounted=true;
        this.getRentalData();
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }    }

    UNSAFE_componentWillUnmount() {
        clearTimeout(this.alert);
        this._isMounted = false;

    }

    getRentalData() {
        trackPromise (
        axios
            .get(API_URL, { headers: authHeader() })
            .then(res => {
                if (this._isMounted) {
                this.setState({ 
                    data: res.data.rentals, 
                    city : res.data.rentals[0].city,
                    street: res.data.rentals[0].street,
                    category: res.data.rentals[0].category,
                    bedrooms: res.data.rentals[0].bedrooms,
                    dailyRate: res.data.rentals[0].dailyRate

                });
                }
            })
            .catch((error) => {
                console.log(error)
            }));
    }

    render() {
        const {city, street, category, bedrooms, dailyRate, showAdminBoard} = this.state;
        return (
            <div className="container">
            <RentalList
                data={this.state.data}
            />
            {showAdminBoard && (
            <RentalUpdateModal
                buttonLabel = "Edit Rental"
                city={city}
                street= {street}
                category={category}
                bedrooms={bedrooms}
                dailyRate={dailyRate}
                onChangeCity={this.onChangeCity}
                onChangeStreet={this.onChangeStreet}
                onChangeCategory={this.onChangeCategory}
                onChangeBedrooms={this.onChangeBedrooms}
                onChangeDailyRate={this.onChangeDailyRate}
                handleUpdateRental={this.handleUpdateRental}
                className={this.state.successful}
                loading={this.state.loading}
                alert={this.state.alert}
            />
            )}
            </div>
        );
    }
}