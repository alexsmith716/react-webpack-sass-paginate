import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

/*
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />,
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) });
}
*/

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
