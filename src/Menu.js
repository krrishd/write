import React, { Component } from 'react';

import {
  Link
} from 'react-router';

import NProgress from 'nprogress';

class Menu extends Component {
  componentDidMount() {
    document.title = "Write";
    NProgress.done();
  }

  render() {
    return (
      <div className="menu fadeIn">
        <h1>Write for:</h1>
        <Link className="menuItem" to="/write/one">1 Minute</Link>
        <Link className="menuItem" to="/write/fifteen">15 Minutes</Link>
        <Link className="menuItem" to="/write/thirty">30 Minutes</Link>
        <Link className="menuItem" to="/write/sixty">60 Minutes</Link>
        <Link className="extLink" to="/saved">/saved</Link>
        <Link className="extLink" to="/about">/about</Link>
      </div>
    );
  }
}

export default Menu;
