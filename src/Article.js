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
    this.store = props.route.store;
    this.article = this.store.getItemsByProperty('slug', props.params.slug)[0];
  }

  delete(e, article, self) {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'There\'s no way to recover anything you delete from here, so make sure you really want to!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, () => {
      self.store.removeItem(article);
      swal({
        title:'Deleted!',
        text: 'This writing no longer exists here.'
      }, () => {
        browserHistory.push('/saved');
      });
    });
  }

  render() {
    let article = this.article;
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
            this.delete(e, article, this);
          }}>/delete</a>
      </div>
    );
  }
}

export default Article;