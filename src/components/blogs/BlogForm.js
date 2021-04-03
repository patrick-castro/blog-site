import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class BlogForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={`Enter ${label.toLowerCase()}...`} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextarea = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} placeholder={`Enter ${label.toLowerCase()}...`} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderDiscardBtn = (blogAction) => {
    let src = '/';

    if (blogAction === 'edit') {
      src = `/blogs/${this.props.initialValues.id}`;
    }

    return (
      <Link to={src} className='ui button'>
        Discard
      </Link>
    );
  };

  onSubmit = ({ title, content }) => {
    this.props.onSubmit({ title: title.trim(), content: content.trim() });
  };

  render() {
    const { initialValues, handleSubmit, blogAction } = this.props;

    return (
      <>
        <form className='ui form error' onSubmit={handleSubmit(this.onSubmit)}>
          <Field name='title' component={this.renderInput} label='Title' />
          <Field
            name='content'
            component={this.renderTextarea}
            label='Content'
          />

          <button className='ui primary button'>Save</button>

          {this.renderDiscardBtn(blogAction)}
        </form>
      </>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.content) {
    errors.content = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'blogForm',
  validate,
})(BlogForm);
