import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Link} from 'react-router-dom';
import AuthService from "../../services/auth.service";
import ResendConfirmModal from '../register/resendConfirmModal';
import SendMailRestPassword from './sendMailResetPassModal';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleResendConfirm = this.handleResendConfirm.bind(this);
    this.handleSendResetPassword = this.handleSendResetPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.alert = 0;

    this.state = {
      password: "",
      loading: false,
      message: "",
      alert: '',
      successful: false,
      confirming: false,
      email: ''
    };
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleResendConfirm(e) {
    e.preventDefault();
    this.setState({
      message: '',
      confirming: true,
      successful: false
    });
    AuthService.resendConfirmAccount(this.state.email)
    .then ( response => {
      this.setState({
        alert: response.data.message,
        successful: true,
        confirming: false
      });
      this.alert = setTimeout( () => {
        this.setState({ alert: ''});
        this.alert = 0
    }, 2000)
    }, error => {
      const resMessage = error.response.data.message
      this.setState({
        successful: false,
        confirming: false,
        alert: resMessage
      });
      this.alert = setTimeout( () => {
        this.setState({ alert: ''});
        this.alert = 0
    }, 2000)
    })

  }

  handleSendResetPassword(e) {
    e.preventDefault();
    this.setState({
      message: '',
      confirming: true,
      successful: false
    });
    AuthService.sendMailResetPass(this.state.email)
    .then (response => {
      this.setState({
        alert: response.data.message,
        successful: true,
        confirming: false
      });
      this.alert = setTimeout( () => {
        this.setState({ alert: ''});
        this.alert = 0
    }, 3000)
    }, error => {
      const resMessage = error.response.data.message
      this.setState({
        successful: false,
        confirming: false,
        alert: resMessage
      });
      this.alert = setTimeout( () => {
        this.setState({ alert: ''});
        this.alert = 0
    }, 2000)
    })
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <div className="d-flex align-items-center justify-content-center">
          <h3>Login</h3>
          </div>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <p className="p-discret m-top-1">Pas encore de compte ?  
                <Link to ="/register"> Inscription</Link>
                </p>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <SendMailRestPassword
              buttonLabel= "Forgot your password?"
              className = {this.state.successful}
              email={this.state.email}
              handleSendResetPassword={this.handleSendResetPassword}
              onChangeEmail = {this.onChangeEmail}
              confirming = {this.state.confirming}
              alert = {this.state.alert}
          />
          <ResendConfirmModal
              buttonLabel= "Resend Account Validation"
              className = {this.state.successful}
              email={this.state.email}
              handleResendConfirm={this.handleResendConfirm}
              onChangeEmail = {this.onChangeEmail}
              confirming = {this.state.confirming}
              alert = {this.state.alert}
          />
        </div>
      </div>
    );
  }
}