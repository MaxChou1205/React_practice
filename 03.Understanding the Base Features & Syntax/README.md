# Module重點
1. 建立React solution
2. 介紹資料夾結構
3. React Component
4. JSX
5. Functional Component & Class Component
6. Method & Event & Two Way Binding

# [建立React solution](https://github.com/facebook/create-react-app)
### 安裝 React
`npm install create-react-app -g`

### 建立solution
`create-react-app <solution name>`

### run server
`npm start`

# 資料夾結構
* 程式進入點：index.js
* 預設的第一個component：App.js
* 建立單元測試：App.test.js
* pre-cache script files：serviceWorker.js

# React Component
index.js其中的`<App/>`代表注入App Component，也可以在這個位置直接寫純HTML  
![APP](note/註解&#32;2019-05-08&#32;233948.png)

# JSX
JSX is NOT HTML but it looks a lot like it. Differences can be seen when looking closely though (for example className in JSX vs class in "normal HTML"). JSX is just syntactic sugar for JavaScript, allowing you to write HTMLish code instead of nested React.createElement(...) calls.  
在JS中可以寫類似HTML的語法糖，React會再轉成真正的HTML，如App.js中的
```
function App()
{
  // return (
  //   <div className="App">
  //     <h1>Hi, I'm a React App</h1>
  //   </div>
  // );
  // 等同於
  return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
}
```
### 限制
* 只能用`className`，不能用`class`
* 一次只能回傳一個根元素。如以下，同時回傳div和h2會導致編譯錯誤
    ```
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
        </div>
        <h2>Another</h2>
    );
    ```
# [Functional Component & Class Component](https://programmingwithmosh.com/react/react-functional-components/)
## Functional Component (presentational)
Person.js
```
import React from 'react';

const person = () =>
{
    return <p>I'm a Person!</p>
}

export default person;
```
App.js
```
import React from 'react';
import './App.css';
import Person from './Person/Person' // 這裡需要import Person.js，且命名需用大寫開頭，才能render HTML元素
function App()
{
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <Person></Person> // 這裡要填入HTML物件
    </div>
  );

  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
}

export default App;
```
## Class Component (stateful)
Person.js
```
import React,{Component} from 'react';

class Person entends Component
{
  render() {
    return <p>My name is {this.props}</p>
  }
}

export default person;
```
App.js
```
import React from 'react';
import './App.css';
import Person from './Person/Person' // 這裡需要import Person.js，且命名需用大寫開頭，才能render HTML元素
function App()
{
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <Person></Person> // 這裡要填入HTML物件
    </div>
  );

  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
}

export default App;
```
# Component
## JSX中動態執行JS
在內容加入{}  

person.js
```
const person = () =>
{
    return <p>I'm a Person and I'm {Math.floor(Math.random() * 30)} years old!</p>
}

```

## 加入自訂屬性
person.js
```
const person = (props) =>
{
    return <p>I'm {props.name} and I'm {props.age} years old!</p>
}
```
App.js
```
function App()
{
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <Person name='Max' age='27'></Person>
      <Person name='Aloma' age='30'></Person>
    </div>
  );
}
```
## 加入HTML內容
person.js
```
const person = (props) =>
{
    return (
        <div>
            <p>I'm {props.name} and I'm {props.age} years old!</p>
            <p>{props.children}</p> // props.children為React保留字
        </div>
    )
}
```
App.js
```
function App()
{
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <Person name='Max' age='27'>My Hobbies: Jogging</Person>
      <Person name='Aloma' age='30'></Person>
    </div>
  );
}
```
## 由變數控制屬性
在class Component底下加入state變數，並assign value。如果state的值有變動，React就會執行re-render

App.js
```
class App extends Component
{
  state = {
    persons: [
      { name: 'Max', age: 27 },
      { name: 'Aloma', age: 30 }
    ]
  }

  render()
  {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>My Hobbies: Jogging</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
      </div>
    );
  };
}
```

## 加入method
App.js
```
class App extends Component
{
  state = {
    persons: [
      { name: 'Max', age: 27 },
      { name: 'Aloma', age: 30 }
    ]
  }

  // 加入事件method
  // 建議用箭頭函式，因為This需要參考到最外層的Class App。如果用ES5的函式，This會參考到<button> (呼叫函式的物件)
  switchNameHandler = () =>
  {
    // Don't Do This: this.state.persons[0].name='Max Chou';
    this.setState({
      persons: [
        { name: 'Max Chou', age: 27 },
        { name: 'Aloma', age: 30 }
      ]
    })
  }

  render()
  {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        // onClick的C大寫
        // this.switchNameHandler因為是要做參考連結，所以不用加()。如果加了()，畫面render時就會執行method
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>My Hobbies: Jogging</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
      </div>
    );
  };
}
```

### Functional Component的state用法
App.js
```
import React, { useState } from 'react';
const App = props =>
{
  // useState會回傳兩個參數，第一個是物件(變數)，第二的是要執行的函式
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 27 },
      { name: 'Aloma', age: 30 }
    ]
  })

  const switchNameHandler = () =>
  {
    setPersonsState({
      persons: [
        { name: 'Max Chou', age: 27 },
        { name: 'Aloma', age: 30 }
      ]
    })
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>My Hobbies: Jogging</Person>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}></Person>
    </div>
  );
}
```

# Props & State
Props：
![props](note/註解&#32;2019-05-11&#32;230536.png)

State：
![state](note/註解&#32;2019-05-11&#32;230753.png)

# 在Method中傳遞參數
1. Bind(較建議使用)：`this.switchNameHandler.bind(this, 'Max!!!')`
2. 箭頭函式：`() => this.switchNameHandler('Max Chou')`

Person.js
```
return (
    <div>
        <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
        <p>{props.children}</p>
    </div>
)
```
App.js
```
render()
  {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button onClick={() => this.switchNameHandler('Max Chou')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Max!!!')}>My Hobbies: Jogging</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
      </div>
    );
  };
```

# 雙向綁定
Person.js
```
return (
  <div>
      <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
      <p>{props.children}</p>
      <input onChange={props.changed} value={props.name}></input> // 若未給予onChange屬性，則input的值會因為綁定props.name而無法改變
  </div>
)
```
App.js
```
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
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <button onClick={() => this.switchNameHandler('Max Chou')}>Switch Name</button>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age}
        click={this.switchNameHandler.bind(this, 'Max!!!')}>My Hobbies: Jogging</Person>
      <Person
        name={this.state.persons[1].name}
        age={this.state.persons[1].age}
        changed={this.nameChangedHandler}></Person> //
    </div>
  );
};
```