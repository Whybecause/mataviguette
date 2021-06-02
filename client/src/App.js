import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import history from "./helpers/history";
import Header from "./components/header/header.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Homepage from "./components/home/Homepage-wrapper";
import Profile from "./components/user/profile/profile.component";
import UserDashboard from "./components/user/dashboard/user-dashboard.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/admin/board-admin.component";
import Caroussel from "./components/home/Caroussel";
import Equippements from "./components/home/Equippements.component";
import ScrollToTopRoute from "./components/home/ScrollTop";
import RegisterConfirm from "./components/register/registerConfirm.component";
import ResetPassForm from "./components/login/resetPass.component";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51GqFXwJAPfrV8kT4Tih5t5zX6T7KVorBovZAI108WBV20GkoOcRKDLQ03X1zv91wdeqV8tIeotpvxZBefL22Gsmw00qQrHXRzW"
);

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <ChakraProvider>
          <Router history={history}>
            <Header />
            <div className="">
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={UserDashboard} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route
                  path="/confirmation/:token"
                  component={RegisterConfirm}
                />
                <Route path="/reset/:token" component={ResetPassForm} />
                <Route path="/photos" component={Caroussel} />
                <ScrollToTopRoute
                  path="/equippements"
                  component={Equippements}
                />
              </Switch>
            </div>
          </Router>
        </ChakraProvider>
      </Elements>
    </>
  );
}

export default App;
