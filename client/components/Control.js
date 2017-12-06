import React, { Component } from 'react';

import Form from './Form';

import css from './Control.scss';

class Control extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.updateState({
      showForm: !this.props.showForm,
      editedItem: false
    });
  }

  render() {
    if (this.props.showForm) {
      return (
        <div className={css.control}>
          <input
              type="text"
              className={css.control__input}
              name="searchInput"
              placeholder="Search..."
              onChange={this.props.handleSearch}
          />
          <div className={css.control__wrap}>
              <div className={css.control__bts-wrap}>
                  <button className={css.btn__add} onClick={this.handleClick}>
                      Create new
                  </button>
                  <button className={css.btn__func} onClick={this.props.uploadTestData}>
                      Upload test data
                  </button>
              </div>
              <p className={css.control__counter}>
                  Всего новостей:&nbsp;
                  {' '}
                  <span className={css.control__counter-bold}>{this.props.dataLength}</span>
              </p>
          </div>
          <Form
              updateState={this.props.updateState}
              addItem={this.props.addItem}
              editedItem={this.props.editedItem}
          />
        </div>
      );
    } else {
      return (
        <div className={css.control}>
            <input
                type="text"
                className={css.control__input}
                name="searchInput"
                placeholder="Search..."
                onChange={this.props.handleSearch}
            />
            <div className={css.control__wrap}>
                <div className={css.control__bts-wrap}>
                    <button className={css.btn__add} onClick={this.handleClick}>
                        Create new
                    </button>
                    <button className={css.btn__func} onClick={this.props.uploadTestData}>
                        Upload test data
                    </button>
                </div>
                <p className={css.control__counter}>
                    Bdvfvdfdvf:&nbsp;
                    {' '}
                    <span className={css.control__counter-bold}>{this.props.dataLength}</span>
                </p>
            </div>
        </div>
      );
    }
  }
}

export default Control;
