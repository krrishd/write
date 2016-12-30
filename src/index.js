import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Editor from './Editor';
import Saved from './Saved';
import Article from './Article';
import About from './About';
import './index.css';
import '../public/playfair/stylesheet.css';

import { 
  Router,
  Route,
  browserHistory
} from 'react-router';

import store from './configure-localStore';

let appStore = store(
  'savedWriting',
  localStorage.getItem('savedWriting')
);

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path='/' component={Menu} />
      <Route
        path='/write/:duration'
        store={appStore}
        component={Editor} />
      <Route
        path='/saved'
        store={appStore}
        component={Saved} />
      <Route
        path='/saved/:slug'
        store={appStore}
        component={Article} />
      <Route
        path='/about'
        component={About} />
    </Router>
  ),
  document.getElementById('root')
);
