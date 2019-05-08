# Module重點
介紹React debug的方法，主要有兩種
1. 利用開發工具的Source下中斷點
2. 參考ErrorBoundary.js，建立一個component，並鑲入App.js中

## 開發者工具
![開發者工具下中斷點](note/註解&#32;2019-05-06&#32;233838.png)

## Component Throw Error
[參考](https://reactjs.org/docs/error-boundaries.html)
1. 建立ErrorBoundary資料夾放除錯用的Component，其內建立ErrorBoundadry.js  
```
import React, { Component } from 'react';

class ErrorBoundary extends Component
{
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) =>
    {
        this.setState({ hasError: true, errorMessage: error });
    }

    render()
    {
        if (this.state.hasError)
        {
            return <h1>Something went wrong</h1>;
        }
        else
        {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
```
2. 將Component加入App.js
```
persons = (
        <div>
          {this.state.persons.map((person, index) =>
          {
            return <ErrorBoundary><Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} /></ErrorBoundary>
          })}
        </div>
      );
```
3. 執行時若有錯誤會出現類似下列訊息![Error](note/註解&#32;2019-05-06&#32;235025.png)

# 其他工具
可搜尋[react developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)，安裝後開發工具會多一個tab，可以看到各個component的state和props。
![react developer tools](note/註解&#32;2019-05-06&#32;235530.png)