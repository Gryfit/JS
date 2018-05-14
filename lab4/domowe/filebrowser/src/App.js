import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SplitPane from 'react-split-pane';
import Directory from './directory.js';

class App extends Component {
  render() {
      return (
          <div className="App">
            <SplitPane split="vertical" defaultSize="50%">
              <Directory className="directory"/>
              <Directory className="directory"/>
            </SplitPane>
          </div>
    );
  }
}

export default App;
