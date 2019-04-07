import React, { Component } from 'react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component
{
  state = {
    user:
      { name: 'Max', age: 28 }
  };

  switchNameHandler = (event) =>
  {
    this.setState({
      user:
        { name: event.target.value, age: 28 }
    });
  };

  render()
  {
    return (
      <div className="App">
        <UserInput name={this.state.user.name} changed={this.switchNameHandler}></UserInput>
        <UserOutput name={this.state.user.name} age={this.state.user.age}></UserOutput>
      </div>
    );
  }
}

export default App;
