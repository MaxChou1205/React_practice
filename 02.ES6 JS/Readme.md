# Module重點
介紹部分React常用的ES6語法糖

## [let](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let) & [const](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/const)

### let：通常作為局部scope，適合for迴圈的計數使用
```
{
  var a = 10;
}

console.log(a); // 10

{
  let a = 10;
}

console.log(a); // a is not defined
```
### const：用於宣告一個固定的常數，設定後值不可改變
```
const myName = 'Max';
console.log(myName); // Max

myName = 'Max Chou';
console.log(myName); // TypeError: Assignment to constant variable.
```

---

## [Arrow Function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
### 一般function：
```
function printName(name){
    console.log(name);
}
```
### Arrow Function：
```
const printName = (name) => {
    console.log(name);
}
```
只有一個參數時可省略括號(兩個參數以上則一定要括號)
```
const printName = name => {
    console.log(name);
}
```
沒有參數的時候須加上空括號
```
const printName = () => {
    console.log('Max');
}
```
若只有一行可省略"return"字眼與大括號
```
const multiply = number => {
    return number * 2;
}
// ---
const multiply = number => number * 2;
```
傳統的函式，this會參考到呼叫函式的物件
```
const obj = { a: 1 }

function func() {
  setTimeout( function() {
    // 這裡`this`，會是這個callback的自己本地(local)綁定值
    // this為window物件(嚴格模式為undefined)
    console.log(this.a) //undefined
  }, 2000)
}

func.call(obj) //undefined

// ---解法
const obj = { a: 1 }

function func(){
  const that = this

  setTimeout(
    function(){
      console.log(that)
    }, 2000)
}

func.call(obj) //Object {a: 1}
```
箭頭函式的this則會參考到作用域
```
const obj = { a:1 }

function func() {
  setTimeout( () => {
    // 這裡`this`會以詞法上的func中為預設
    console.log(this.a)
  }, 2000)
}

func.call(obj) //Object {a: 1}
```
---
# [Export](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/export) & [Import](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/import)
### export可以導出變數或函式模組，常見有兩種模式：
1. default export：可以直接import或是在import時指定alias的變數
```
// person.js
const person = {
    name:'Max'
}

export default person
```
2. named export：import時需指定欲導入的模組
```
// utility.js
export const clean = () => {...}
export const baseData = 10;
```

### import
```
// app.js
// import default
import './person.js'
import person from './person.js'
import abc from './person.js'

// import named
import {baseData} from './utility.js'
import {clean} from './utility.js'
import {clean as cc} from './utility.js'
import * as bundled from './utility.js'
```
---
# [Classes](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes/constructor)
```
class Human {
    gender = 'male';

    printGender = () => {
        console.log(this.gender);
    }
}

// inheritance
class Person extends Human {
    // Property
    constructor() {
        super(); // 用這個才能使用繼承來的gender
        this.name = 'Max';
    } 

    // Method
    printMyName() {
        console.log(this.name);
    } 
}

// usage
const person = new Person();
person.printMyName();
person.printGender();
```
---
# [Spread](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax) & [Rest Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
### spread：可展開array或是對object做淺層複製(Object.assign())
```
const number = [1,2,3];
const newNumbers1 = [number,4]; // [[1,2,3],4]
const newNumbers1 = [...number,4]; // [1,2,3,4]

//---
const person = {
    name:'Max
};

const newPerson = {
    ...person,
    age:28
}

console.log(newPerson); // {age:28,name:'Max'}
```
### rest：可以表示不確定數量的參數，並將其視為一個陣列
```
const filter = (...args) => {
    return args.filter(el=>el===1);
}

console.log(filter(1,2,3)); // [1]
```
---
# [Destructuring](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
### array
```
const numbers = [1,2,3];
[num1, ,num3] = numbers;
console.log(num1,num3); // 1,3
```
```
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```
### object
```
const {name} = {name:'Max',age:27}
console.log(name) // Max
console.log(age) // undefined
```
```
var params = {
	name: '123',
	title: '456',
	type: 'aaa'
}

var { type, ...other } = params;

<CustomComponent type='normal' number={2} {...other} />
//等同於
<CustomComponent type='normal' number={2} name='123' title='456' />
```