import React, { Component } from 'react';

import {
  Link,
  browserHistory
} from 'react-router';

import swal from 'sweetalert';
import '../node_modules/sweetalert/dist/sweetalert.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedWriting: JSON.parse(localStorage.getItem('savedWriting'))
    }
  }

  delete(e, article) {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'There\'s no way to recover anything you delete from here, so make sure you really want to!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, () => {
      let savedWriting = this.state.savedWriting;
      savedWriting.splice(
        (savedWriting.indexOf(article)), 1);
      localStorage.setItem('savedWriting', JSON.stringify(savedWriting));
      swal({
        title:'Deleted!',
        text: 'This writing no longer exists here.'
      }, () => {
        browserHistory.push('/saved');
      });
    });
  }

  render() {
    let article = this.state
      .savedWriting.find(el => {
        return (el.slug == this.props.params.slug);
      });
    let content = article.content;
    let date = article.date;
    document.title = date;
    return (
      <div className="article">
        <Link to="/saved" className="back">Back</Link>
        <h1 className="articleTitle">{date}</h1>
        <div
          className="articleContent fadeIn"
          dangerouslySetInnerHTML={
            {__html:content}
          }>
        </div>
        <a
          href="#"
          className="delete extLink"
          onClick={(e) => {
            e.preventDefault();
            this.delete(e, article);
          }}>/delete</a>
      </div>
    );
  }
}

export default Article;