import React from 'react';
import { connect } from 'react-redux';

import { createBlog } from '../../actions';
import BlogForm from './BlogForm';

class BlogCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createBlog({
      ...formValues,
      userId: this.props.userId,
      authorFirstName: this.props.firstName,
      authorLastName: this.props.lastName,
    });
  };

  render() {
    return (
      <div>
        <h2>Create Blog</h2>
        <BlogForm blogAction='create' onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    firstName: state.auth.givenName,
    lastName: state.auth.lastName,
  };
};

export default connect(mapStateToProps, { createBlog })(BlogCreate);
