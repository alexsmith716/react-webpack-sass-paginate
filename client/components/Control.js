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
        <div>
          <input
              type="text"
              name="searchInput"
              placeholder="Search..."
              onChange={this.props.handleSearch}
          />
          <div>
              <div>
                  <button onClick={this.handleClick}>
                      Create new1
                  </button>
                  <button onClick={this.props.uploadTestData}>
                      Upload test data1
                  </button>
              </div>
              <p>
                  Ddvfvfd:&nbsp;
                  {' '}
                  <span>{this.props.dataLength}</span>
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
        <div>
            <input
                type="text"
                name="searchInput"
                placeholder="Search..."
                onChange={this.props.handleSearch}
            />
            <div>
                <div>
                    <button onClick={this.handleClick}>
                        Create new2
                    </button>
                    <button onClick={this.props.uploadTestData}>
                        Upload test data2
                    </button>
                </div>
                <p>
                    Bdvfvdfdvf:&nbsp;
                    {' '}
                    <span>{this.props.dataLength}</span>
                </p>
            </div>
        </div>
      );
    }
  }
}

export default Control;
