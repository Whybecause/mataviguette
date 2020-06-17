import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap';
import axios from 'axios';
import AuthService from './services/auth.service';
import authHeader from './services/auth-header';

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/user/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Caroussel from './components/home/Caroussel';
import Equippements from './components/home/Equippements.component';
import ScrollToTopRoute from './components/home/ScrollTop';
import RegisterConfirm from './components/register/registerConfirm.component';
import ResetPassForm from './components/login/resetPass.component';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51GqFXwJAPfrV8kT4Tih5t5zX6T7KVorBovZAI108WBV20GkoOcRKDLQ03X1zv91wdeqV8tIeotpvxZBefL22Gsmw00qQrHXRzW');

class App extends Component {
  _isMounted = false;
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.toggle= this.toggle.bind(this);
      this.closeNavbar = this.closeNavbar.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
        isOpen: false,
        navCollapsed: true,
        showNavbar: false,
        navigate: false,
        isValidToken: ''
      };
    }

  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  UNSAFE_componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this._isMounted = false;
  }

  toggle() {
    this.setState({
      isOpen : !this.state.isOpen
    });
  }

  closeNavbar() {
    this.setState({
      isOpen: false
    });
  }

  handleClickOutside(event) {
    const t = event.target;
    if (this.state.isOpen && !t.classList.contains('navbar-toggler')) {
      this.closeNavbar();
    }
  }
  isValidToken() {
    axios.get("api/token", { headers: authHeader() })
    .then(res => {
      if (res.data === true) {
        if (this._isMounted) {
        this.setState({
          isValidToken: true
        })
      }
      } else {
        localStorage.removeItem("user");
      }
    })
  }

    componentDidMount() {
      this._isMounted = true;
      this.isValidToken();
      const user = AuthService.getCurrentUser();
      if (user && this._isMounted) {
        this.setState({
          currentUser: AuthService.getCurrentUser(),
          showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN")
        });
      }
    }


    logOut() {
      AuthService.logout();
      this.setState({currentUser: false});
      this.setState({ showAdminBoard: false});
      this.setState({showModeratorBoard: false});
    }
  
    render() {
      const { currentUser, showModeratorBoard, showAdminBoard, isValidToken } = this.state;
      return (
        <Elements stripe={stripePromise}>
        <Router>
          <div>
            <div className="border-styled">
                <Navbar color="white" light expand="md">
                  <NavbarBrand tag={Link} to ="/">Mataviguette</NavbarBrand>
                  <NavbarToggler onClick={this.toggle}/>
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar className="navbar-item-container">
                      {showModeratorBoard && (
                        <NavItem>
                          <NavLink tag={Link} to ="/mod">Moderator Board</NavLink>
                        </NavItem>
                      )}

                      {showAdminBoard && (
                        <NavItem >
                          <NavLink className="btn btn-danger text-white resp-mg"tag={Link} to ="/admin">Admin Board</NavLink>
                        </NavItem>
                      )}

                      {currentUser && isValidToken && (
                      <div className="navbar-item ">
                        <NavItem >
                          <NavLink className="btn btn-info text-white resp-mg " href="/user">My Bookings</NavLink>
                        </NavItem>
                      </div>
                      )}
                      <div>
                          {currentUser && isValidToken ? (
                            <div className="navbar-item">
                              <NavItem className="resp-center">
                                <NavLink tag={Link} to ="/profile">{currentUser.username}</NavLink>
                              </NavItem>

                              <NavItem className="resp-center">
                                <NavLink tag={Link} to ="/login" onClick={this.logOut}>LogOut</NavLink>
                              </NavItem>
                            </div>
                          ) : (
                            <div className="navbar-item">
                              <NavItem className="resp-center">
                                <NavLink tag={Link} to ="/login">Login</NavLink>
                              </NavItem>
                              <NavItem className="resp-center">
                                <NavLink tag={Link} to ="/register">Sign up</NavLink>
                              </NavItem>
                            </div>
                          )}
                        </div>
                      </Nav>
                  </Collapse>
                </Navbar>   
          </div> 

        <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route path="/confirmation/:token" component={RegisterConfirm} />
                <Route path="/reset/:token" component={ResetPassForm} />
              </Switch>
            </div>
            <ScrollToTopRoute path="/equippements" component={Equippements} />
            <Route path="/photos" component={Caroussel} />
            
        </div>
      </Router>
      </Elements>
    );
  }
}

export default App;