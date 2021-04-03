import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import BlogCreate from './blogs/BlogCreate';
import BlogDelete from './blogs/BlogDelete';
import BlogEdit from './blogs/BlogEdit';
import BlogList from './blogs/BlogList';
import BlogShow from './blogs/BlogShow';
import Header from './Header';
import history from '../history';

class App extends React.Component {
  render() {
    return (
      <div className='ui container'>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path='/' exact component={BlogList} />
              <Route path='/blogs/new' exact component={BlogCreate} />
              <Route path='/blogs/:id' exact component={BlogShow} />
              <Route path='/blogs/edit/:id' exact component={BlogEdit} />
              <Route path='/blogs/delete/:id' exact component={BlogDelete} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
