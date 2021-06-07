import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ScrollToTop from './components/ScrollTop';
import history from "./helpers/history";
import Header from "./components/header/header.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Homepage from "./components/home/Homepage-wrapper";
import Profile from "./components/user/profile/profile.component";
import UserDashboard from "./components/user/dashboard/user-dashboard.component";
import BoardAdmin from "./components/admin/board-admin.component";
import Caroussel from "./components/home/Caroussel";
import Equippements from "./components/Equippements.component";
import RegisterConfirm from "./components/register/registerConfirm.component";
import ResetPassForm from "./components/login/resetPass.component";
import Footer from './components/footer/Footer.component';

const stripePromise = loadStripe(
  "pk_test_51GqFXwJAPfrV8kT4Tih5t5zX6T7KVorBovZAI108WBV20GkoOcRKDLQ03X1zv91wdeqV8tIeotpvxZBefL22Gsmw00qQrHXRzW"
);

function App() {
  return (
      <Elements stripe={stripePromise}>
        <ChakraProvider>
          <Router history={history}>
                <ScrollToTop />
                <Header />
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/user" component={UserDashboard} />
                  <Route path="/admin" component={BoardAdmin} />
                  <Route
                    path="/confirmation/:token"
                    component={RegisterConfirm}
                    />
                  <Route path="/reset/:token" component={ResetPassForm} />
                  <Route path="/photos" component={Caroussel} />
                  <Route path="/equipements" component={Equippements}/>
                </Switch>
                <Footer />
          </Router>
        </ChakraProvider>
      </Elements>
  );
}

export default App;
