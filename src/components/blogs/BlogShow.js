import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBlog } from '../../actions';

class BlogShow extends React.Component {
  componentDidMount = () => {
    this.props.fetchBlog(this.props.match.params.id);
  };

  renderButtons = (blogId) => {
    return (
      <div>
        <Link
          to={`/blogs/edit/${blogId}`}
          className='ui right teal floated button'>
          Edit
        </Link>

        <Link
          to={`/blogs/delete/${blogId}`}
          className='ui right red floated button'>
          Delete
        </Link>
      </div>
    );
  };

  render() {
    if (!this.props.blog) {
      return <h3>Loading...</h3>;
    }

    const { title, content, id, userId: blogUserId } = this.props.blog;
    return (
      <div>
        <div
          style={{
            display: 'flex',

            justifyContent: 'space-between',
          }}>
          <h2>{title}</h2>

          {this.props.signedInUserId === blogUserId
            ? this.renderButtons(id)
            : null}
        </div>

        <div style={{ marginTop: '20px' }}>
          <p>{content}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs[ownProps.match.params.id],
    signedInUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
