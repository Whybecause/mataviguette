import React, { Component } from "react";
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Container } from 'reactstrap';
import '../../../styles/CommentBox.css';
import 'whatwg-fetch';
import axios from 'axios';
import { UncontrolledCollapse, Button } from 'reactstrap';
import authHeader from '../../../services/auth-header';
import AuthService from '../../../services/auth.service';


// const API_URL = "http://localhost:8080/api/test";
const API_URL = "/api/test";
// const API_URL = "https://mataviguette.herokuapp.com/api/test";

export default class comments extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error : null,
            author: '',
            text: '',
            showAdminBoard: false
        }
    }
    intervalID;

    componentDidMount() {
        this._isMounted = true;
        this.getCommentsData();
        this.intervalID = setInterval(this.getCommentsData.bind(this), 2000);
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    UNSAFE_componentWillUnmount() {
        clearInterval(this.intervalID);
        this._isMounted = false;
    }

    getCommentsData() {
        this._isMounted = true;
        axios
            .get(API_URL + '/comment', {})
            .then(res => {
                if ( this._isMounted) {
                this.setState({data: res.data})
                }
                })
            .catch((error) => {
                console.log(error)
            })
    }
    

    handleDeleteComment = (id) => {
        const i = this.state.data.findIndex(c => c._id === id);
        const data = [
            ...this.state.data.slice(0, i),
            ...this.state.data.slice(i + 1),
        ];
        this.setState({ data });
        axios.delete (`/api/test/comment/delete/${id}`, { headers: authHeader() })
            .then(res => {
                this.setState ({ data})
            })
            .catch((error) => {
                console.log(error)
            })
    }



    render() {
        return (
            <div>
                <div className="comment-form-container">
                    <CommentForm />
                </div>
                <div className="comments-container">
                    <div className="btn-show-comments-container">
                        <Button className="btn-afficher-commentaires" color="primary" id="toggler2" style={{ marginBottom: '1rem'}}>
                            ...Afficher les commentaires ({this.state.data.length})
                        </Button>
                    </div>
                <Container>
                        <UncontrolledCollapse toggler="#toggler2">
                            <CommentList 
                                data={this.state.data} 
                                handleDeleteComment={this.handleDeleteComment}
                                showAdminBoard={this.state.showAdminBoard}
                                />

                        </UncontrolledCollapse>
                </Container>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}