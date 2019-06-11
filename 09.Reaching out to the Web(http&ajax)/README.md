# Module重點
1. [Axios](#axios)
2. [生命週期建議](#http請求相關的生命週期建議)

## Axios
不限於React，任何架構下都可以使用的一種client端呼叫http的library，主要是以Promise建成  
輸入`npm install axios --save`安裝套件  

此module配合 [jsonplaceholder](https://jsonplaceholder.typicode.com/)去call API假資料

使用例子：  
Get
```
axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response =>
    {
        console.log(response);
        this.setState({ posts: response.data })
    });
```
Post
```
axios.post('https://jsonplaceholder.typicode.com/posts', data)
    .then(response =>
    {
        console.log(response);
    });
```
Delete
```
axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
    .then(response =>
    {
        console.log(response);
    });
```
Error Handle
```
// incorrect url
axios.get('https://jsonplaceholder.typicode.com/postss')
    .then(response =>
    {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post =>
        {
            return {
                ...post,
                author: 'Max'
            }
        })
        console.log(response);
        this.setState({ posts: updatedPosts });
    })
    .catch(error =>
    {
        // console.log(error);
        this.setState({ error: true })
    });
```
### interceptors
axios的全域攔截器，在then或catch之前擷取request或response，可以用於記錄每次請求的request或response，或是當response或出現錯誤時要處理的動作都是重複的情況下使用
> 其中一定要有return，不然就不會繼續執行和進入then或catch
```
// request攔截器
axios.interceptors.request.use(request)=>{
     return request;
   },error=>{
     return Promise.reject(error);
   });
 
// response攔截器
axios.interceptors.response.use(response=>{
      return response;
   },function(error=>{
     return Promise.reject(error);
   });

// 刪除攔截器
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

### 建議作法
可以設定全域的URL或header等參數，在其他程式中呼叫就不用重複做設定了
```
// index.js
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Blog.js
axios.get('/posts') // 不用重複填'https://jsonplaceholder.typicode.com'
    .then(response =>
    {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post =>
        {
            return {
                ...post,
                author: 'Max'
            }
        })
        console.log(response);
        this.setState({ posts: updatedPosts });
    })
    .catch(error =>
    {
        // console.log(error);
        this.setState({ error: true })
    });
```
另外也可以使用[instance](https://medium.com/@Mike_Cheng1208/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619)
```
// axios.js
import axios from 'axios';

const instane = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com';
});

export default instane;
```

## http請求相關的生命週期建議
第一次呼叫或是render畫面時，可以寫在`componentDidMount`
```
componentDidMount()
{
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response =>
        {
            console.log(response);
            this.setState({ posts: response.data })
        });
}
```

重新呼叫時，可以寫在`componentDidUpdate`中，但要注意的是，在componentDidUpdate中更新state的話，會重新觸發componentDidUpdate，造成無窮呼叫的迴圈，所以需要在componentDidUpdate中判斷state和props的變數狀態，如下
```
componentDidUpdate()
{
    if (this.props.id)
    {
        if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
        {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response =>
                {
                    // console.log(response);
                    this.setState({ loadedPost: response.data });
                });
        }
    }
}
```
