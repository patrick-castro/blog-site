import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBlogs } from '../../actions';

class BlogList extends React.Component {
  componentDidMount = () => {
    this.props.fetchBlogs();
  };

  renderList = () => {
    const { blogs } = this.props;

    return blogs.map(
      (
        {
          title,
          content,
          id,
          authorFirstName: firstName,
          authorLastName: lastName,
        },
        idx
      ) => {
        return (
          <div key={id} className='ui segment'>
            <h3 className='header' style={{ marginBottom: '20px' }}>
              <Link to={`blogs/${id}`}>{title}</Link>
            </h3>
            <p>{content}</p>
            <p>{`Author: ${firstName} ${lastName}`}</p>
          </div>
        );
      }
    );
  };

  renderCreateBlogBtn = () => {
    if (this.props.isSignedIn) {
      return (
        <Link to={'/blogs/new'} className='ui primary button'>
          <i className='plus icon'></i>Create Blog
        </Link>
      );
    }

    return null;
  };

  render() {
    if (!this.props.blogs.length) {
      return (
        <div>
          <h3>No available data...</h3>
        </div>
      );
    }

    return (
      <div style={{ paddingBottom: '50px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
          <h2>Blog</h2>
          {this.renderCreateBlogBtn()}
        </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    blogs: Object.values(state.blogs),
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
