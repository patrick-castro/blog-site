import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
  render() {
    return (
      <div style={{ padding: '1em 0em' }}>
        <div className='ui large pointing secondary menu'>
          <Link to='/' className='active item'>
            Home
          </Link>

          <a className='item'>About</a>
          <div className='right menu'>
            <GoogleAuth />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
