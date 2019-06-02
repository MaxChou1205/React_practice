# Module重點
1. [重整程式結構]( #重整程式結構)
2. [Stateful & Stateless](#stateful--stateless)
3. [Lifecycle](#lifecycle)
4. [useEffect](#useeffect)
5. [DOM & Virtual DOM](#dom--virtual-dom)
6. [Aux](#aux)
7. [HOC](#higher-order-component)
8. [Prop Types](#prop-types)
9. [Context](#react-context)

## 重整程式結構
一般不建議在render中寫太多的JSX，所以這節的重點是把以下兩段併到其他的component中
```
persons = (
    <div>
        {this.state.persons.map((person, index) =>
        {
        return <ErrorBoundary key={person.id}>
            <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
        </ ErrorBoundary>
        })}
    </div>
);
```

```
return (
    <div className={classes.App}>
    <h1>Hi, I'm a React App</h1>
    <p className={assignedClasses.join(' ')}>This is really working!</p>
    <button
        className={btnClass}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
    {persons}
    </div>
);
```

Persons.js
```
import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((person, index) =>
{
    return <Person
        click={() => props.clicked(index)}
        name={person.name}
        age={person.age}
        changed={(event) => props.changed(event, person.id)} />
});

export default persons;
```

Cockpit.js
```
import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) =>
{
    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons)
    {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2)
    {
        assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.persons.length <= 1)
    {
        assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;
```

Cockpit.css
```
.Cockpit {
    text-align: center;
  }
  
  .red {
    color: red;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .Cockpit button {
    border: 1px solid blue;
    padding: 16px;
    background-color: green;
    font: inherit;
    color: white;
    cursor: pointer;
  }
  
  .Cockpit button:hover {
    background-color: lightgreen;
    color: black;
  }
  
  .Cockpit button.Red {
    background-color: red;
  }
  
  .Cockpit button.Red:hover {
    background-color: salmon;
    color: black;
  }
```

## Stateful & Stateless
![img](note/註解&#32;2019-05-28&#32;001648.png)
建議App.js使用Stateful(class-based)，主要用來控制狀態與flow。一般的Component則使用Stateless(Functional、Presentational)，主要只接收input並呈現UI的顯示，這樣component數量多時較易於維護

## Lifecycle
* Lifecycle Hooks與React Hooks完全無關
* 完全看不懂範例，待補

### Creation
![img](note/註解&#32;2019-05-28&#32;211831.png)

### Update
![img](note/註解&#32;2019-05-28&#32;211847.png)

### shouldComponentUpdate
若回傳false，則不會重新觸發render。主要是判斷props和state有無改變，若無，則不重新產生virtual DOM，所以可以用來做效能優化。要注意props是物件或array，一般情況下只有淺拷貝，在判斷值有無改變時時要特別注意
```
shouldComponentUpdate(nextProps, nextState)
{
    console.log('[Persons.js] shouldComponentUpdate');
    if (nextProps.Person !== this.props.person)
        return true;
    else
        return false;
}
```

## useEffect
cpmponentDidMount與componentDidUpdate的合體，不論是第一次執行或是更新都會進來這個函式，可利用以下方法控制進入點

完全不控制 (每次render都會進入)
```
useEffect(() =>
{
    setTimeout(() =>
    {
        alert('Saved data to cloud!!')
    }, 1000);
})
```

變數更新時才進入
```
useEffect(() =>
{
    setTimeout(() =>
    {
        alert('Saved data to cloud!!')
    }, 1000);
}, [props.persons]) // 給予欲偵測的變數
```

第一次render時才進入，之後re-render都不會進入
```
useEffect(() =>
{
    setTimeout(() =>
    {
        alert('Saved data to cloud!!')
    }, 1000);
}, []) // 給一個空陣列
```

### React memo
同是用作最佳化，待補

## DOM & Virtual DOM
React會存一份原有的virtual DOM，並在新的virtual DOM產生的時候做差異比較，確認差異是需要更新之後才產生真正的DOM
![img](note/註解&#32;2019-05-31&#32;000332.png)  
---
## Aux
一般情況下，React產生的HTML會有一個根元素包著DOM
```
const Root = () => {
  return <div>
    <p>Hello, World!</p>
    <p>I am a demo for react-aux.</p>
  </div>;
};
```
產生的DOM如下
```
<div>
  <p>Hello, World!</p>
  <p>I am a demo for react-aux.</p>
</div>
```

但如果使用Aux，就可以不產生根元素
```
const Aux = (props) => {
  return props.children;
};

const Root = () => {
  return <Aux>
    <p>Hello, World!</p>
    <p>I am a demo for react-aux.</p>
  </Aux>;
};
```
產生的DOM如下
```
<p>Hello, World!</p>
<p>I am a demo for react-aux.</p>
```

Aux的寫法如下，必須注意回傳只回傳props => props.children，代表他會像React.CreateElement一樣去長DOM  

```
// Aux.js
import React from 'react';

const aux = props => props.children;

export default aux;
```

## Higher Order Component
待補


## setState
當要改變state時，不可以直接指定，必須使用setState()，因為setState()之後才會觸發render更新畫面，但state和props不一定會同時改變，所以可以加入`prevState`和`props`參數
```
// 將
this.setState({ persons: persons, changeCounter: prevState.changeCounter + 1 });

// 改為
this.setState((prevState, props) => {
    return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
    };
});
```

## Prop Types
可以用來幫助判斷props的型態，先執行`npm install --save prop-types`來安裝套件，之後在需要使用的component加入`import PropTypes from 'prop-types';`，像以下的使用方式，若型態錯誤則在瀏覽器開發工具的console會出現錯誤
```
// Person.js

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

// App.js
state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: "28" }, // age應該要是number而不是string
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
};
```

## Ref
像是selector一樣可以用來指定DOM
```
constructor(props)
{
    super(props);
    this.inputElementRef = React.createRef(); // 1. 先建立參考
}
componentDidMount()
{
    this.inputElementRef.current.focus(); // 3. 執行動作
}

render()
{
    return (
        <Aux>
            <p onClick={this.props.click}>
                I'm {this.props.name} and I am {this.props.age} years old!
            </p>
            <p key="i2">{this.props.children}</p>
            <input
                key="i3"
                ref={this.inputElementRef} // 2. binding參考的變數
                type="text"
                onChange={this.props.changed}
                value={this.props.name}
            />
        </Aux>
    );
}
```

在stateless component中如果要使用ref的話，要先載入`useRef`，像這樣`import React, { useEffect, useRef } from 'react';`  
之後指定綁定的變數`const toggleBtnRef = useRef(null);`
在HTML加入ref屬性
```
return (
  <div className={classes.Cockpit}>
    <h1>{props.title}</h1>
    <p className={assignedClasses.join(' ')}>This is really working!</p>
    <button ref={toggleBtnRef}  // 這裡指定變數
            className={btnClass} 
            onClick={props.clicked}>
      Toggle Persons
    </button>
  </div>
);
```
最後，必須把事件加在useEffect中，因為必須確保render執行完畢才能抓的到DOM
```
useEffect(() =>
{
  toggleBtnRef.current.click(); // 加在這裡
}, []); // 這裡參數指定空array，一樣是為了只有在第一次render的時候才執行
```

## React Context
用在跨層傳遞變數，假設今天Component A要傳變數到Component D，照之前的方法，要透過props一層層從B傳到C再到D，但實際上可以能B或C根本用不到這個變數，這時context就可以解決類似這樣的問題

先加入新的component
```
// auth-context.js
import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => { }
});

export default authContext;
```

在要傳出state的component加入
```
<AuthContext.Provider
  value={{
    authenticated: this.state.authenticated,
    login: this.loginHandler
  }}
>
```
```
// App.js

return (
  <Aux>
    <button
      onClick={() => {
        this.setState({ showCockpit: false });
      }}
    >
      Remove Cockpit
    </button>
    <AuthContext.Provider
      value={{
        authenticated: this.state.authenticated,
        login: this.loginHandler
      }}
    >
      {this.state.showCockpit ? (
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        />
      ) : null}
      {persons}
    </AuthContext.Provider>
  </Aux>
);
```

* 若是stateless的component則使用useContext `import React, {useContext} from 'react';`
```
// Cockpit.js

const authContext = useContext(AuthContext);

<button onClick={authContext.login}>Log in</button>
```

* 若是class-based component則可以使用contextType。宣告`static contextType = AuthContext;`並使用`this.context`取到變數
```
// Person.js

static contextType = AuthContext;

render() {
  console.log('[Person.js] rendering...');
  return (
    <Aux>
      {this.context.authenticated ? ( // here
        <p>Authenticated!</p>
      ) : (
        <p>Please log in</p>
      )}

      <p onClick={this.props.click}>
        I'm {this.props.name} and I am {this.props.age} years old!
      </p>
      <p key="i2">{this.props.children}</p>
      <input
        key="i3"
        // ref={(inputEl) => {this.inputElement = inputEl}}
        ref={this.inputElementRef}
        type="text"
        onChange={this.props.changed}
        value={this.props.name}
      />
    </Aux>
  );
}
```