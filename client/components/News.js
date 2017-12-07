
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import css from './News.scss';

import Article from './Article';
import Control from './Control';

import testData from '../data/testData';
import api from '../api';

class News extends Component {

  constructor(props) {

    super(props);

    this.state = {
      displayedNews: this.props.data,
      inputValue: '',
      showForm: false,
      editedItem: false,
      currentPage: 1,
      offset: 0
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.uploadTestData = this.uploadTestData.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.checkSearchVal = this.checkSearchVal.bind(this);

  }

  handleSearch(e) {

    const searchQuery = e.target.value.toLowerCase();
    const newsArr = this.props.data.filter(el => {
      const itemHeader = el.header.toLowerCase();
      return itemHeader.indexOf(searchQuery) !== -1;
    });

    this.setState({
      inputValue: searchQuery,
      displayedNews: newsArr
    });

  }

  uploadTestData() {
    testData.map(item => api.createArticle(item).then(() => this.props.updateData()));
  }

  addItem(item) {

    if (this.state.editedItem) {

      api.updateArticle(item._id, item).then(() => this.props.updateData());

    } else {

      api.createArticle(item).then(() => this.props.updateData());

    }

    this.setState({
      editedItem: false
    });
  }

  editItem(item) {
    this.setState({
      showForm: !this.stateShowForm,
      editedItem: item
    });
  }
    

  removeItem(id) {
    api.deleteArticle(id).then(() => this.props.updateData());
  }

  updateState(obj) {
    this.setState(obj);
  }

  handlePageClick(e) {
    this.setState({
      currentPage: e.selected,
      offset: e.selected * this.props.perPage
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayedNews: nextProps.data
    });
  }

  checkSearchVal(data) {
      if (this.state.inputValue !== '') {
        const filteredData = data.filter(el => {
          const itemHeader = el.header.toLowerCase();
          return itemHeader.indexOf(this.state.inputValue) !== -1;
        });
        return filteredData;
      } else {
        return data;
      }
  }

  // Replace map arrow function
  // with Object.keys(this.props.ntn).forEach

  render() {
    const data = this.checkSearchVal(this.state.displayedNews);
    let newsTemp;

    const pagesCount = Math.ceil(data.length / this.props.perPage);
    let startCount = 0;

    if (data.length > 0) {

      Object.keys(data).forEach(function (p,i) {

        if (i >= this.state.offset && startCount < this.props.perPage) {
          startCount++;
          return (
            <Article
              key={p.id}
              data={p}
              editItem={this.editItem}
              removeItem={this.removeItem}
            />
          );
        }

      })

    } else {
      newsTemp = <p className={css.news__warning}>Jbsdjcbdhshjscbhs.</p>;
    }

    return (
      <div className={css.news}>
        <Control
          handleSearch={this.handleSearch}
          addItem={this.addItem}
          uploadTestData={this.uploadTestData}
          showForm={this.state.showForm}
          editedItem={this.state.editedItem}
          updateState={this.updateState}
          dataLength={data.length}
        />
        {newsTemp}
        <ReactPaginate 
          previousLabel={'previous!!!'}
          nextLabel={'next!!!'}
          breakLabel={<a href="">...</a>}
          breakClassName={css.paginationBreak}
          pageCount={pagesCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
        />
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array
};

export default News;


