import React from 'react';
import { connect } from 'react-redux';

import { updateBlog, fetchBlog } from '../../actions';
import BlogForm from './BlogForm';

class BlogEdit extends React.Component {
  componentDidMount = () => {
    const { fetchBlog, match } = this.props;
    fetchBlog(match.params.id);
  };

  onSubmit = (formValues) => {
    const { updateBlog, match } = this.props;
    updateBlog(match.params.id, formValues);
  };

  render() {
    if (!this.props.blog) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Edit Blog</h2>
        <BlogForm
          blogAction='edit'
          initialValues={this.props.blog}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { updateBlog, fetchBlog })(BlogEdit);
