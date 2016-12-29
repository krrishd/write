import React, { Component } from 'react';

import {
  Link,
  browserHistory
} from 'react-router';

import ReactQuill from 'react-quill';
import '../node_modules/react-quill/node_modules/quill/dist/quill.base.css';
import '../node_modules/react-quill/node_modules/quill/dist/quill.snow.css';

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css';

import swal from 'sweetalert';
import '../node_modules/sweetalert/dist/sweetalert.css';

let numberTextToInt = {
  "one": 1,
  "fifteen": 15,
  "thirty": 30,
  "sixty": 60
};

// Taken from http://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
let secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}

class Editor extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      timeSinceLastEdit: 0,
      timeSinceStarted: 0,
      content: ''
    };

    this.duration = ((numberTextToInt[
      this.props.params.duration
    ]) * 60) + 5;

    this.timerCleared = false;
  }

  onTextChange = (value) => {
    this.setState({
      timeSinceLastEdit: 0,
      content: value
    });
  }

  generateSavedArticle(content) {
    let savedArticle = {};
    let savedDate = new Date();
    savedArticle.slug = savedDate.toISOString();
    savedArticle.date = 
      savedDate.toDateString() + ' - ' + 
      savedDate.toLocaleTimeString();
    savedArticle.content = content;
    return savedArticle;
  }

  clearTimer(self) {
    if (this.state.content.length == 0) {
      swal({
        title: 'Nice attempt!',
        text: 'Next time, make sure to write until your time is up so you have content to leave with.'
      }, () => {
        browserHistory.push('/saved');
      });
    }
    else if (!self.timerCleared) {
      let savedItems;
      if (localStorage.getItem('savedWriting')) {
        savedItems = JSON.parse(localStorage.getItem('savedWriting'));
      } else {
        savedItems = [];
      }
      savedItems.push(
        this.generateSavedArticle(
          this.state.content
        )
      );
      localStorage.setItem('savedWriting', JSON.stringify(savedItems));
      swal({
        title:'You\'re done!',
        text: 'You can access your writing at /saved. Happy editing!'
      }, () => {
        browserHistory.push('/saved');
      });
    }
    let quillEditor = document.querySelector('.ql-editor');
    quillEditor.classList.remove('disappearing');
    NProgress.done();
    clearInterval(self.loadInterval);
    self.loadInterval = false;
    self.timerCleared = true;
  }

  componentDidMount() {
    let quillEditor = document.querySelector('.ql-editor');
    quillEditor.setAttribute('spellcheck', false);
    quillEditor.focus();

    NProgress.configure({
      showSpinner: false,
      trickle: false,
      minimum: 0
    });

    NProgress.done();
    NProgress.start();

    this.loadInterval = setInterval(() => {

      document.title = secondsToHms(
        this.duration - this.state.timeSinceStarted - 1
      );

      NProgress.set(this.state.timeSinceStarted/this.duration);

      if (this.state.timeSinceLastEdit > 4) {
        quillEditor.classList.add('disappearing');
      } else {
        if (quillEditor.classList.contains('disappearing')) {
          quillEditor.classList.remove('disappearing');
        }
      }

      if (this.state.timeSinceLastEdit > 7) {
        if (this.state.timeSinceStarted > (this.duration - 2)) {
          this.clearTimer(this);
        }
        this.setState({
          content: '',
          timeSinceLastEdit: 0
        });
      }

      if (this.state.timeSinceStarted > (this.duration - 2)) {
        this.clearTimer(this);
      }

      this.setState({
        timeSinceLastEdit: (this.state.timeSinceLastEdit + 1),
        timeSinceStarted: (this.state.timeSinceStarted + 1)
      });
    }, 1000)
  }

  componentWillUnmount() {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  render() {
    return (
      <div className="editorContainer fadeIn">
        <Link to="/" className="back">Back</Link>
        <ReactQuill
          className="reactQuill"
          theme="snow"
          toolbar={false}
          value={this.state.content}
          onChange={this.onTextChange}/>
        <div className="timer">
          <h1>{
            secondsToHms(
              this.duration - this.state.timeSinceStarted
            )
          }</h1>
        </div>
      </div>
    )
  }
}

export default Editor;