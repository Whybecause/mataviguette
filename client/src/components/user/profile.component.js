import React, { Component } from "react";
import { Container } from 'reactstrap';
import AuthService from "../../services/auth.service";
import UpdatePassModal from './profile.updatePassModal';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeOldPass = this.onChangeOldPass.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmNewPass = this.onChangeConfirmNewPass.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.alert = 0;

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      oldPass: '',
      password: '',
      confirmNewPass: '',
      loading: false,
      successful: false,
      alert: '',
      data:[]
    };
  }

  onChangeOldPass(e) {
    this.setState({
        oldPass: e.target.value
    });
    }
    onChangePassword(e) {
      this.setState({
          password: e.target.value
      });
    }
    onChangeConfirmNewPass(e) {
      this.setState({
          confirmNewPass: e.target.value
      });
    }

    handleUpdatePassword(e) {
      e.preventDefault();
      const data = {
        oldPass : this.state.oldPass,
        password : this.state.password,
        confirmNewPass : this.state.confirmNewPass
      }
      this.setState({
        alert: '',
        successful: false,
        loading: true
      })
      AuthService.updatePassword(data)
      .then(response => {
        this.setState({
          alert: response.data.message,
          successful: true,
          loading: false,
        })
        this.resetForm();
        this.alert = setTimeout( () => {
          this.setState({ alert: ''});
          this.alert = 0
        }, 2000)
      }, error => {
        const resMessage = error.response.data.message;
        this.setState({
          successful: false,
          loading: false,
          alert: resMessage
        });
        this.alert = setTimeout( () => {
          this.setState({ alert: ''});
          this.alert = 0
        }, 2000)
      })
    }
    resetForm() {
      this.setState({
        oldPass:'',
        password:'',
        confirmNewPass:''
      });
    }

    UNSAFE_componentWillUnmount() {
      clearTimeout(this.alert);
  }
  render() {
    const { currentUser, oldPass, password, confirmNewPass   } = this.state;

    return (
      <Container>
        <header className="jumbotron m-top-1 text-center" fluid="true">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <UpdatePassModal
            buttonLabel = "Edit Password"
            oldPass={oldPass}
            password={password}
            confirmNewPass={confirmNewPass}
            onChangeOldPass={this.onChangeOldPass}
            onChangePassword={this.onChangePassword}
            onChangeConfirmNewPass={this.onChangeConfirmNewPass}
            handleUpdatePassword={this.handleUpdatePassword}
            loading={this.state.loading}
            className={this.state.successful}
            alert={this.state.alert}

        />


      </Container>


    );
  }
}

        // <p>
        //   <strong>Token:</strong>{" "}
        //   {currentUser.accessToken.substring(0, 20)} ...{" "}
        //   {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        // </p>
        // <p>
        //   <strong>Id:</strong>{" "}
        //   {currentUser.id}
        // </p>
        //         <strong>Authorities:</strong>
        // <ul>
        //   {currentUser.roles &&
        //     currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        // </ul>