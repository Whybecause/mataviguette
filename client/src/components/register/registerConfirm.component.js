import React, { Component } from "react";
import AuthService from "../../services/auth.service";

export default class RegisterConfirm extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleConfirmAccount = this.handleConfirmAccount.bind(this);
        this.state = {
            message: '',
            loading: false,
            successful: false,
            email: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleConfirmAccount(e) {
        const {token} = this.props.match.params;
        e.preventDefault();
        this.setState({
            message: '',
            loading: true,
            successful: false
        });
        AuthService.confirmAccount(token, this.state.email)
        .then(res => {
            this.setState({
                message: res.data.message,
                loading: false,
                successful: true
            })
        }, error => {
        const resMessage = error.response.data.message
        this.setState({
                message: resMessage,
                loading: false,
                successful: false
            })
        })
    }

    render() {
        const {token} = this.props.match.params
        return (
        <div className="container card">
            <form
                id="confirmAccount-form"
                onSubmit={this.handleConfirmAccount}
                methode="POST"
            >
                <div className="form-group">
                    <label htmlFor="email">Confirm your Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>
                <div>
                    <input
                        type="hidden"
                        name="token"
                        value={token}
                    />
                </div>
                <button className="btn btn-primary" type="submit" onClick={this.handleConfirmAccount} disabled={this.state.loading}>
                    {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Confirm</span>
                </button>
                <div className="m-top-1">
                    {this.state.message && (
                        <div className={this.state.successful ? "alert alert-success": "alert alert-danger"} role="alert">
                            {this.state.message}
                        </div>
                    )}
                </div>

            </form>
        </div>
        )
    }
}