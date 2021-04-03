import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '1088318056987-dburq9helim6s6ls0nntvq7nu710loo6.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  onAuthChange = (isSignedIn) => {
    const currUserProfileInstance = this.auth.currentUser
      .get()
      .getBasicProfile();

    if (isSignedIn) {
      this.props.signIn({
        userId: currUserProfileInstance.getId(),
        givenName: currUserProfileInstance.getGivenName(),
        lastName: currUserProfileInstance.getFamilyName(),
      });
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <>
          <div className='item'>
            <p>{`Hi ${this.props.givenName}!`}</p>
          </div>
          <div className='item'>
            <button
              className='ui red google button'
              onClick={this.onSignOutClick}>
              <i className='google icon'></i>
              Sign Out
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className='item'>
          <button className='ui red google button' onClick={this.onSignInClick}>
            <i className='google icon'></i>
            Sign In with Google
          </button>
        </div>
      );
    }
  };

  render() {
    return <>{this.renderAuthButton()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    givenName: state.auth.givenName,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
