import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { Row } from 'reactstrap';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment
      author={comment.author}
      key={comment._id}
      id={comment._id}
      timestamp={comment.updatedAt}
      handleDeleteComment={props.handleDeleteComment}
      showAdminBoard={props.showAdminBoard}
    >
      { comment.text}
    </Comment>
  ));
  return (
    <Row>
      { commentNodes }
    </Row>
  );
};

CommentList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.object,
      id: PropTypes.string,
      text: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
    handleDeleteComment: PropTypes.func.isRequired,
    showAdminBoard: PropTypes.bool.isRequired
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;