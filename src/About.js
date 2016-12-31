import React, { Component } from 'react';

import {
  Link
} from 'react-router';

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = 'About';
  }

  render() {
    return (
      <div>
        <Link to="/" className="back">Back</Link>
        <div className="about">
          <h1>About</h1>
          <p>This is a a writing app based on <a target="_blank" href="http://www.hailoverman.com/flowstate">Flowstate</a>.</p>
          <p>The purpose of this is to get the user to write for a set duration without any inhibition or distraction allowed. To achieve this, the editor lets one write for a specified duration, within which, if the user goes inactive, all that has been written is deleted completely. This forces the user to continuously write throughout the session, resulting in a rough draft of (a lot of) content that can then be revised/polished.</p>
          <p>All the functionality is client-side; it's a single-page app built with React and all saved data is only saved in localStorage.</p>
          <a href="https://github.com/krrishd/write" className="extLink">/github</a>
          <a href="http://itskrish.co" className="extLink">/me</a> 
       </div>
      </div>
    );
  }
}

export default About;
