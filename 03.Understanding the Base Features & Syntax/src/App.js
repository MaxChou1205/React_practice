import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
class App extends Component
{
  state = {
    persons: [
      { name: 'Max', age: 27 },
      { name: 'Aloma', age: 30 }
    ],
  }


  switchNameHandler = (newName) =>
  {
    // Don't Do This: this.state.persons[0].name='Max Chou';
    this.setState({
      persons: [
        { name: newName, age: 27 },
        { name: 'Aloma', age: 30 }
      ]
    })
  }

  nameChangedHandler = (event) =>
  {
    this.setState({
      persons: [
        { name: 'Max', age: 27 },
        { name: event.target.value, age: 30 }
      ]
    })
  }

  render()
  {
    const style = {
      backgroundColor: 'White',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button style={style} onClick={() => this.switchNameHandler('Max Chou')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Max!!!')}>My Hobbies: Jogging</Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler}></Person>
      </div>
    );
  };
}

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person'
// const App = props =>
// {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Max', age: 27 },
//       { name: 'Aloma', age: 30 }
//     ]
//   })

//   const switchNameHandler = () =>
//   {
//     setPersonsState({
//       persons: [
//         { name: 'Max Chou', age: 27 },
//         { name: 'Aloma', age: 30 }
//       ]
//     })
//   }

//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>My Hobbies: Jogging</Person>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}></Person>
//     </div>
//   );
// }

// export default App;
