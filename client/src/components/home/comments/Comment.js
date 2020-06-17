import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Col, Button } from 'reactstrap';
import '../../../styles/CommentBox.css';

const Comment = props => (
    <Col> 
      <div className="singleComment">
        <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
        <div className="textContent">
            <div className="singleCommentContent">
            {props.author ? (
                <h3 className="comment-author-text">{props.author.username}</h3>
            ) : (
                <p className="comment-author-text p-discret">Deleted</p>
              )}
              
              <ReactMarkdown source={props.children} />
            </div>
            
            <div className="singleCommentButtons">
              <span className="time">{moment(props.timestamp).fromNow()}</span>
              {props.showAdminBoard && (
            <Button color="danger" onClick={() => { props.handleDeleteComment(props.id) }}>delete</Button>
            )}
            </div>
        </div>
      </div>
    </Col>
);

Comment.propTypes = {
  author: PropTypes.object,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
  showAdminBoard: PropTypes.bool.isRequired
};

export default Comment;