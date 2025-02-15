import React from 'react';

import css from './Form.scss';


class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.closeAround = this.closeAround.bind(this);
    this.createItem = this.createItem.bind(this);
    this.addNews = this.addNews.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.refs.modal.elements.formHeader.focus();
  }

  closeAround(e) {
    const target = e.target;
    if (target === e.currentTarget) {
      this.props.updateState({
        showForm: false
      });
    }
  }

  createItem(elements) {
    let newsItem;
    if (this.props.editedItem) {
      newsItem = {
        _id: this.props.editedItem._id,
        id: this.props.editedItem.id,
        header: elements.formHeader.value,
        author: elements.formAuthor.value,
        date: this.props.editedItem.date,
        text: elements.formText.value
      };
    } else {
      newsItem = {
        header: elements.formHeader.value,
        author: elements.formAuthor.value,
        text: elements.formText.value
      };
    }
    this.props.addItem(newsItem);
  }

  addNews(e) {
    const form = e.currentTarget;
    this.createItem(form.elements);
    e.preventDefault();
    e.stopPropagation();
    this.props.updateState({
      showForm: false
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 13 && e.target.name !== 'formText') {
      e.preventDefault();
    }
    if (e.keyCode === 27) {
      this.props.updateState({
        showForm: false
      });
    }
  }

  render() {
    return (
      <div onClick={this.closeAround}>
        <form ref="modal" onSubmit={this.addNews}>
          <div>
            <input
              name="formHeader"
              type="text"
              placeholder="Header"
              defaultValue={this.props.editedItem.header}
              onKeyDown={this.onKeyDown}
              required
            />
          </div>
          <div>
            <input
              name="formAuthor"
              type="text"
              placeholder="Author"
              defaultValue={this.props.editedItem.author}
              onKeyDown={this.onKeyDown}
              required
            />
          </div>
          <div>
            <textarea
              name="formText"
              rows="3"
              placeholder="Your text..."
              defaultValue={this.props.editedItem.text}
              onKeyDown={this.onKeyDown}
              required
            />
          </div>
          <div>
            <button onClick={this.closeAround}>
              Cancel
            </button>
            <button type="submit">Okay</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;


