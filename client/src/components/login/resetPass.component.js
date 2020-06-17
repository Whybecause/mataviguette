//post to api/password/reset
//a fournir password, password2, email, token

import React, { Component } from "react";
import AuthService from '../../services/auth.service';

export default class ResetPassForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.handleResetPass = this.handleResetPass.bind(this);
        this.alert = 0;
        
        this.state = {
            email: '',
            password: '',
            password2: '',
            loading: false,
            successful: false,
            alert: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        })
    }

    resetForm() {
        this.setState({email: '', password: '', password2: '', token: ''});
    }
    handleResetPass(e) {
        const {token} = this.props.match.params
        e.preventDefault();
        this.setState({
            alert :'',
            loading: true,
            successful: false
        })
        AuthService.resetPass(token, this.state.email, this.state.password, this.state.password2)
        .then (res => {
            this.setState({
                alert: res.data.message,
                loading: false,
                successful: true
            });
            this.resetForm();
            this.alert = setTimeout( () => { 
              this.setState({alert:''});
              this.alert= 0
          }, 3000)
        }, error => {
            const resMessage = error.response.data.message
            this.setState({ 
                alert: resMessage,
                loading: false,
                successful: false
            });
            this.alert = setTimeout( () => { 
                this.setState({alert:''});
                this.alert= 0
            }, 3000)
        })
    }
    UNSAFE_componentWillUnmount() {
        clearTimeout(this.alert);
    }

    render() {
        const {token} = this.props.match.params
        return (
            <div className="container card">
            <form
                id="resetPass-form"
                onSubmit={this.handleResetPass}
                methode="POST"
            >
                <div className="form-group">
                    <label htmlFor="email">Your email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={this.state.password2}
                        onChange={this.onChangePassword2}
                    />
                </div>
                <div>
                    <input
                        type="hidden"
                        name="token"
                        value={token}
                    />
                </div>
                <button className="btn btn-primary" type="submit" onClick={this.handleResetPass} disabled={this.state.loading}>
                    {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Confirm</span>
                </button>
                <div className="m-top-1">
                    {this.state.alert && (
                        <div className={this.state.successful ? "alert alert-success": "alert alert-danger"} role="alert">
                            {this.state.alert}
                        </div>
                    )}
                </div>

            </form>
        </div>
        )
    }

}