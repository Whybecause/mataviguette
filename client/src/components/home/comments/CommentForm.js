import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button } from 'reactstrap';
import CommentService from '../../../services/comment.service';
import {Link} from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../../services/auth-header';

// const required = value => {
//   if (!value) {
//     return (
//     <div className="alert alert-danger" role="alert">
//       Ce champ est requis!
//     </div>
//     );
//   }
// };

export default class CommentForm extends Component {
  _isMounted= false;
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleTimeOut = 0;

    this.state = {
      text: "",
      successful : false,
      message: "",
      isValidToken: ''
    };
  }
  componentDidMount() {
    this._isMounted = true
    this.isValidToken();
  }
  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful : false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      CommentService.submitComment(this.state.text)
      .then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.handleTimeOut = setTimeout( () => {
            this.setState({ message: '', text:''});
            this.handleTimeOut = 0;
          }, 3000)
        },
        error => {
          const resMessage = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
        this.handleTimeOut = setTimeout( () => {
          this.setState({ message: ''});
          this.handleTimeOut = 0;
        }, 3000)
      }
    );
  } else {
    this.setState({
      succesful: false
    });
  }
}

UNSAFE_componentWillUnmount() {
  clearTimeout(this.handleTimeOut);
  this._isMounted = false;
}

render() {
  const { isValidToken } = this.state;
  return (
    <div>
      {!isValidToken && (
        <div className="container d-flex align-items-center justify-content-center">
          <Link to ="/login">Login to comment</Link>
        </div>
      )}
      {isValidToken && ( 
        <Form
          onSubmit={this.handleSubmit}
          ref={c => {
            this.form = c;
          }}
        >
            <div>
              <div>
                <label htmlFor="text"></label>
                <Input
                  type="text"
                  className="form-control"
                  name="text"
                  placeholder= "Laissez un commentaire"
                  value={this.state.text}
                  onChange={this.onChangeText}
                  // validations={[required]}
                />
              </div>
              <div>
                <Button className="form-submit-btn" color="primary">Envoyer</Button>{' '}
              </div>
            </div>
          

          {this.state.message && (
            <div className="container d-flex align-items-center justify-content-center">
            <div className="form-group m-top-1 d-flex">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success align-items-center justify-content-center"
                    : "alert alert-danger align-items-center justify-content-center"
                }
                role="alert"
              >
                {this.state.message}
              </div>
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
        )}
    </div>
  );
}
}


























// const CommentForm = props => (
//   <form onSubmit={props.submitComment}>
//     <input
//       type="text"
//       name="author"
//       placeholder="Your name…"
//       value={props.author}
//       onChange={props.handleChangeText}
//     />
//     <input
//       type="text"
//       name="text"
//       placeholder="Say something..."
//       value={props.text}
//       onChange={props.handleTextChange}
//     />
//     <button type="submit">Submit</button>
//   </form>
// );

// CommentForm.propTypes = {
//   submitComment: PropTypes.func.isRequired,
//   handleChangeText: PropTypes.func.isRequired,
//   text: PropTypes.string,
//   author: PropTypes.string,
// };

// CommentForm.defaultProps = {
//   text: '',
//   author: '',
// };

// export default CommentForm;