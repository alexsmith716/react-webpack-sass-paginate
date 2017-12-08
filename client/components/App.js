import React from 'react';

import News from './News';
import api from '../api';

import css from './App.scss';

class App extends React.Component {
  
  constructor(props) {

    super(props);

    this.state = {
        localData: []
    };

    this.updateData = this.updateData.bind(this);

  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    api.listArticles().then(res => {
      this.setState({
        localData: res.reverse()
      });
    });
  }

  render() {
    return (
      <div className={css.app}>
        <h3 className={css.app__header}>News</h3>
        <News data={this.state.localData} updateData={this.updateData} perPage={15} />
      </div>
    );
  }

}

export default App;
