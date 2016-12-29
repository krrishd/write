import React, { Component } from 'react';

import {
  Link,
  browserHistory
} from 'react-router';

import Dropzone from 'react-dropzone';

import swal from 'sweetalert';
import '../node_modules/sweetalert/dist/sweetalert.css';

class Saved extends Component {
  constructor(props) {
    super(props);
    let savedWriting;
    if (!localStorage.getItem('savedWriting')) {
      savedWriting = []
    } else {
      savedWriting = JSON.parse(localStorage.getItem('savedWriting'))
    }
    this.state = {
      savedWriting
    }
  }

  // taken from http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  stringToColour = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
  
  genDownloadURI = (text) => {
    return ('data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  }

  deleteAll(e) {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'There\'s no way to recover anything you delete from here, so make sure you really want to!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it all!',
      closeOnConfirm: false
    }, () => {
      localStorage.removeItem('savedWriting');
      swal({
        title:'All writing deleted!',
        text: 'Hope you backed up the stuff you cared about.'
      }, () => {
        browserHistory.push('/');
        browserHistory.push('/saved');
      })
    })
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let reader = new FileReader();
    if (rejectedFiles.length > 0 ||
      acceptedFiles.length == 0) {
      swal({
        title: 'You tried to upload an invalid savefile!',
        text: 'Your savefile should have been downloaded from here.'
      });
    } else {
      reader.readAsText(acceptedFiles[0]);
      let content;
      reader.onload = (e) => {
        content = reader.result;
        swal({
          title: 'Are you sure you\'d like to upload this?',
          text: 'Your existing content will be overwritten by the contents of the savefile.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, upload!',
          closeOnConfirm: false
        }, () => {
          let contentJSON = JSON.parse(content);
          if (contentJSON.length == 0 ||
            !contentJSON[0] ||
            !contentJSON[0].date ||
            !contentJSON[0].slug ||
            !contentJSON[0].content) {
            return swal({
              title: 'Invalid savefile!',
              text: 'Looks like you uploaded JSON that isn\'t a savefile.',
              type: 'error'
            });
          }
          localStorage.setItem('savedWriting', content);
          swal({
            title: 'Uploaded!',
            text: 'The contents of your savefile can now be viewed locally at /saved.'
          }, () => {
            browserHistory.push('/');
            browserHistory.push('/saved');
          });
        });
      }
    }
  }

  componentDidMount() {
    document.title = "Saved Writing";
  }

  render() {
    let self = this;
    let savedWritingItems = this.state
      .savedWriting.map(item => {
        return (
          <div key={item.slug} className="savedWritingItem">
            <Link
              to={'/saved/' + item.slug}
              style={{
                borderColor: this.stringToColour(
                  (new Date(item.slug)).toDateString().split(' ')[1])
              }}>{item.date}</Link>
          </div>
        )
      }).reverse();
    
    if (savedWritingItems.length == 0) {
      savedWritingItems = (<p>Nothing here yet!</p>);
    }
    
    return (
      <div className="saved fadeIn">
        <Link to="/" className="back">Back</Link>
        <h1>Saved</h1>
        {savedWritingItems}
        <a
          href="#"
          className="delete extLink"
          onClick={this.deleteAll}>/delete-all</a>
        <a
          href={
            this.genDownloadURI(localStorage.getItem('savedWriting'))
          }
          download="savefile.json"
          className="download extLink"
          onClick={this.downloadSaveFile}>/download</a>
        <Dropzone
          className="dropzone"
          accept="application/json"
          onDrop={this.onDrop}>
          <a
            className="drop extLink"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
            >/upload</a>
        </Dropzone>
      </div>
    );
  }
}

export default Saved;