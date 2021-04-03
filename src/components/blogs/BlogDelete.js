import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBlog, deleteBlog } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class BlogDelete extends React.Component {
  componentDidMount = () => {
    const { fetchBlog, match } = this.props;
    fetchBlog(match.params.id);
  };

  renderActions = () => {
    const { match, deleteBlog } = this.props;

    return (
      <>
        <button
          onClick={() => deleteBlog(match.params.id)}
          className='ui button negative'>
          Delete
        </button>

        <Link to={`/blogs/${match.params.id}`} className='ui button'>
          Cancel
        </Link>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.blog) {
      return 'Are you sure you want to delete this blog?';
    }

    return `Are you sure you want to delete "${this.props.blog.title}"?`;
  };

  render() {
    const { blog } = this.props;

    return (
      <div>
        <Modal
          title='Delete Blog'
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push(`/blogs/${this.props.match.params.id}`)}
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

export default connect(mapStateToProps, { fetchBlog, deleteBlog })(BlogDelete);
