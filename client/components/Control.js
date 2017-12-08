import React from 'react';

import Form from './Form';
import css from './Control.scss';


class Control extends React.Component {

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
        <div className="form">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="searchInput"
              placeholder="Search..."
              onChange={this.props.handleSearch}
            />
            <div>
              <div>
                <button className="btn-sm btn-success btn-sm" onClick={this.handleClick}>
                  Create new
                </button>
                <button className="btn-sm btn-primary btn-sm" onClick={this.props.uploadTestData}>
                  Upload test data
                </button>
              </div>
              <p className={css.counter}>
                Number of Articles:&nbsp;
                {' '}
                <span className={css.counter__bold}>{this.props.dataLength}</span>
              </p>
            </div>
            <Form
              updateState={this.props.updateState}
              addItem={this.props.addItem}
              editedItem={this.props.editedItem}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="searchInput"
              placeholder="Search..."
              onChange={this.props.handleSearch}
            />
            <div className="row">
              <div>
                <button className="btn btn-success btn-sm" onClick={this.handleClick}>
                  Create new!
                </button>
                <button className="btn btn-primary btn-sm" onClick={this.props.uploadTestData}>
                  Upload test data!
                </button>
              </div>
              <p className={css.counter}>
                Number of Articles:&nbsp;
                {' '}
                <span className={css.counter__bold}>{this.props.dataLength}</span>
              </p>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default Control;
