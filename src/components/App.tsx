import React from 'react';

import SearchForm from './SearchForm';

import '../styles/styles.scss';

/**
 * <App />
 * Top level wrapper component
 * This is intended to emulate the home page/house any other widgets etc.
 */

const App = () => (
  <div className="App">
    <SearchForm />
  </div>
);

export default App;
