import React, { Component } from 'react';

import {
  Link,
  browserHistory
} from 'react-router';

import NProgress from 'nprogress';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.indexToURL = [
      'fifteen',
      'one',
      'thirty',
      'sixty'
    ];
    this.state = {
      menuIndex: 0
    }
  }

  menuEventHandler(e, self) {
    let def = document.querySelectorAll('.default');
    for(var i = 0; i < def.length; i++) {
      def[i].className = def[i].className.replace('default', '');
    }
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        browserHistory.push(`/write/${self.indexToURL[self.state.menuIndex]}`)
      case 40:
        //down
        e.preventDefault();
        if (self.state.menuIndex < 3) {
          self.setState({
            menuIndex: (self.state.menuIndex + 1)
          });
        } else if (self.state.menuIndex == 3) {
          self.setState({
            menuIndex: 0
          });
        }
        break;
      case 38:
        //up
        e.preventDefault();
        if (self.state.menuIndex == 0) {
          self.setState({
            menuIndex: 3
          });
        } else {
          self.setState({
            menuIndex: (self.state.menuIndex - 1)
          });
        }
        break;
    }
  }

  componentDidMount(init = true) {
    document.title = "Write";
    NProgress.done();
    document.querySelector(
      `.${this.indexToURL[this.state.menuIndex]}`
    ).className += ' default';
    document.querySelector('.menu').focus();
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown');
  }

  render() {
    return (
      <div
        tabIndex="0"
        className="menu fadeIn"
        onKeyDown={
          (e) => {
            this.menuEventHandler(e, this);
          }
        }
        onBlur={(e) => {
          document.querySelector('.menu').focus();
        }}>
        <h1>Write for:</h1>
        <Link className="menuItem fifteen" to="/write/fifteen">15 Minutes</Link>
        <Link className="menuItem one" to="/write/one">1 Minute</Link>
        <Link className="menuItem thirty" to="/write/thirty">30 Minutes</Link>
        <Link className="menuItem sixty" to="/write/sixty">60 Minutes</Link>
        <Link className="extLink" to="/saved">/saved</Link>
        <Link className="extLink" to="/about">/about</Link>
      </div>
    );
  }
}

export default Menu;
