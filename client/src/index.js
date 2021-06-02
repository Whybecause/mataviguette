import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

// import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import './styles/fonts.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/theme.css';
import './styles/responsive.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
<Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
</div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
    <LoadingIndicator/>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
