import React from 'react';
import { Route } from 'react-router-dom';
import List from './list'


class App extends React.Component {
  render(){
    return(
      <div>
        <h1>Notes</h1>
        <List />
      </div>
    );
  }
}

export default App;
