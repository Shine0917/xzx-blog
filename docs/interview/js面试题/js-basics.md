1. JS中使用typeof能得到哪些类型  考点JS变量类型
2. 何时使用=== 何时使用==    强制类型转换
3. window.onload 和DOMContentLoaded 的区别   浏览器的渲染过程
4. 用JS创建10个a标签，点击的时候弹出对应的序号     作用域
5. 简述如何实现一个模块加载器，实现类似require.js基本功能   JS模块化
6. 实现数组随机排序   JS基础算法

JS有哪些内置函数
JS变量按照存储方式区分为哪些类型，并描述其特点
如何理解JSON

变量类型：值类型与引用类型
```js
var a =100;
var b=a;
a = 200;
console.log(b); //100
```

引用类型 (对象，函数，数组)
```js
var a = {age:20}
var b =a;
b.age = 100;
console.log(a.age); //100

```
```js
typeof undefined //undefined
typeof 'abc' //string
typeof 123  //number
typeof true  //boolean
typeof {} //object
typeof [] //object
typeof null //object
typeof console.log //function
```
typeof可以区分值类型

#### 变量类型--强制类型转换

字符串拼接
```js
var a = 100+10 //110
var b= 100+'10' //10010
100 == '100'   true
0 ==''  true 
null == undefined  //true
```

if语句
```js
var a = true
if(a){
// ...
}

var b = 100;
if(b){
 // ...
}

var c = ''
if(c){

}
```
逻辑运算
```js
console.log(10 && 0) //0
console.log(''|| 'abc') 'abc'
console.log(!window.abc) //true

//判断一个变量会被当作true
还是false
var a =100;
console.log(!!a)

```