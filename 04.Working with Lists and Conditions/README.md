# Module重點
1. 設定條件以控制Component
2. 利用迴圈動態生成多個Component

# Condition
直接照JS的方法加入if，當state的變數改變時，會觸發re-render，並根據條件長出相對應的element
App.js
```
togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState( { showPersons: !doesShow } );
}

let persons = null;
if ( this.state.showPersons ) {
  persons = (
    <div>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age} />
      <Person
        name={this.state.persons[1].name}
        age={this.state.persons[1].age}
        click={this.switchNameHandler.bind( this, 'Max!' )}
        changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
      <Person
        name={this.state.persons[2].name}
        age={this.state.persons[2].age} />
    </div>
  );
}

return (
  <div className="App">
    <h1>Hi, I'm a React App</h1>
    <p>This is really working!</p>
    <button
      style={style}
      onClick={this.togglePersonsHandler}>Toggle Persons</button>
    {persons}  // 當this.state.showPersons為true時，會長出persons element
  </div>
);
```

# List
利用原生的array map去render array中的內容  
其中建議加上`key`保留字，加快re-render
```
if (this.state.showPersons)
{
  persons = (
    <div>
      // 從這開始
      {this.state.persons.map((person, index) =>
      {
        return <Person
          click={this.deletePersonsHandler.bind(this, index)}
          name={person.name}
          age={person.age}
          key={person.id} // Important
          changed={(event) => this.nameChangedHandler(event, person.id)}></Person>
      })}
    </div>
  );
}
```

### State
範例中還示範了對state變數的操作，建議都是先複製state的變數，修改完新變數後，再透過setState存回state變數
```
nameChangedHandler = (event, id) =>
{
  const personIndex = this.state.persons.findIndex(p => p.id === id);
  const person = { ...this.state.persons[personIndex] };
  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState({
    persons: persons
  })
}

deletePersonsHandler = (personIndex) =>
{
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({ persons: persons });
}
```