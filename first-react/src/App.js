import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component
{
  state = {
    persons: [
      { id: '11', name: 'Max', age: 28 },
      { id: '22', name: 'Manu', age: 29 },
      { id: '33', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  switchNameHandler = (newName) =>
  {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

  nameChangedHandler = (event, id) =>
  {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () =>
  {
    const doesToggle = this.state.showPersons;
    this.setState({ showPersons: !doesToggle });
  }

  deletePersonHandler = (index) =>
  {
    const persons = this.state.persons;
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  render()
  {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1p solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    if (this.state.showPersons)
    {
      persons = (
        <div>
          {this.state.persons.map((person, index) =>
          {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    const classes = ['red', 'bold'].join(' ');

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes}>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>Person Toggle</button>
        {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
