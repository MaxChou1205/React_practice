# Module重點  
1. [Inline Style](#inline-style)
2. [Dynamic Style](#dynamic-style)
3. [Dynamic Class Name](#dynamic-class-name)
4. [Radium](#radium)
5. [CSS Modules](#css-modules)

# Inline Style
直接在JSX中透過變數去新增style  
缺點：無法加入hover等CSS效果，所以可以參考 [Radium](#radium)
```
render()
{
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button
        style={style} // here
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}
    </div>
  );
}
```

# Dynamic Style
直接改變style變數的值
```
render()
{
  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  let persons = null;

  if (this.state.showPersons)
  {
    style.backgroundColor = 'red'; //here
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
}
```

# Dynamic Class Name
將變數指定給className  

App.css
```
.red{
  color: red;
}

.bold{
  font-weight: bold;
}
```

App.js
```
render()
  {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    const classes = [];
    if (this.state.persons.length <= 2)
    {
      classes.push('red');
    }
    if (this.state.persons.length <= 1)
    {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p> // here
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
```

# Radium
安裝radium  
`npm install --save radium`

程式中先import  
`import Radium from 'radium';`

export加入radium
`export default Radium(App);`

完成後style變數就可以加入hover屬性
```
const style = {
  backgroundColor: 'green',
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'lightgreen',
    color: 'black'
  }
};

style[':hover'] = {
  backgroundColor: 'salmon',
  color: 'white'
}
```

## 引入media
先在App.js import StyleRoot  
`import Radium,{StyleRoot} from 'radium';`

在Person.js加入Component樣式
```
const person = (props) =>
{
    const style = {
        '@media (min-width:500px)': {
            width: '450px'
        }
    }

    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};
```
在App.js render html的JSX中加入<StyleRoot>
```
persons = (
  <StyleRoot>
    <div>
      {this.state.persons.map((person, index) =>
      {
        return <Person
          click={this.deletePersonsHandler.bind(this, index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.nameChangedHandler(event, person.id)}></Person>
      })}
    </div>
  </StyleRoot>
);
```

# [CSS Modules](https://github.com/css-modules/css-modules)
先照以下方法進行設定。完成後，程式執行起來class name會是獨特的識別碼，優點如以下：
1. CSS結構化、模組化
2. 會有Autoprefixer來處理跨瀏覽器的prefix問題


首先需要安裝eject，這是一套可以管理package的套件

執行 eject `npm run eject`。執行完成後，會出現config和scripts資料夾  
在webpack.config中找到`test: /\.css$/,`並加入以下兩行。localIdentName會讓程式在編譯時，產生唯一的class name
```
modules: true,
localIdentName: '[name]__[local]__[hash:base64:5]'
```
整體的module會長這樣
```
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      },
    },
  ...
}
```

之後在js import CSS的部分改成用module引入的方式`import classes from './App.css';`  
className也改成用參照變數的方式`className={classes.App}`
```
return (
  <div className={classes.App}>
    <h1>Hi, I'm a React App</h1>
    <p className={classes.join(' ')}>This is really working!</p>
    <button
      style={style}
      onClick={this.togglePersonsHandler}>Toggle Persons</button>
    {persons}
  </div>
);
```