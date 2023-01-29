import React, { Component } from 'react'
import './App.css';
import Count from './components/Count';

class App extends Component {
  state = {
    sum: 0,
  }
  render() {
    return (
      <div className="App">
        <Count />
      </div>
    );
  }


}

export default App;
