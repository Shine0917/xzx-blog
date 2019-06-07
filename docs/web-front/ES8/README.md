## ES8特性
[[toc]]
### 1.async/await 

在ES8中加入了`async/await` 的支持，更好的解决了回调地狱的问题，使得代码看起来更简洁。
```js
login(userName) {
  return new Promise ((reslove, reject) => {
    setTimeout(() => {
      resolve('1001');
    },600);
  });
}

getData(userId) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(userId === '1001') {
        resolve('Success');
      }else {
        reject('Fail');
      }
    },600);
  
  });
}
```   
```js  
//不使用async/await ES7
doLogin(userName) {
  this.login(userName)
  .then(this.getData)
    .then(result => {
      console.log(result)
  })
}


//使用async/await ES8
async doLogin2(userName) {
  const userId =await this.login(userName); 
  const result = await this.getData(userId);
}
this.doLogin(); //Success
this.doLogin2(); // Success
```

##### async/await的几种运用场景

1.获取异步函数的返回值

异步函数本身会返回一个``Promise，所以我们可以通过`then`来获取异步函数的返回值
```js
async function charCountAdd(data1,data2) {
  const d1 = await charCount(data1);
  const d2 = await charCount(data2);
  return d1+d2;
}
charCountAdd('hello','hi').then(console.log); //通过then获取异步函数的返回值。

function charCount(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.length);
    },1000);
  });
}
```
上述例子，通过两次`await`调用，每次都是等待1秒，一共是2秒，效率比较低，而且两次`await`的调用并没有依赖关系，，，然后可以用`Promise.all`来实现`await`的并发调用。
```js
async function charCountAdd(data1,data2) {
  const [d1,d2] = await Promise.all([charCount(data1),charCount(data2)]);
  return d1+d2;
}
charCountAdd('hello','hi').then(console.log);
function charCount(data) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(data.length);
    },1000);
  });
}
```
上述例子通过两次`charCount`的并发调用，`Promise.all`接受的是一个数组，它可以将数组中的`promise`对象并发执行；

`async/await`的几种错误处理方式

1.捕捉整个`async/await`函数的错误
```js
async function charCountAdd(data1,data2) {
  const d1 = await charCount(data1);
  const d2 = await charCount(data2);
  return d1+d2;
}
charCountAdd('hello','hi')
  .then(console.log)
  .catch(console.log); //捕捉整个async/await函数的错误
```   

这种方式可以捕捉整个`charCountAdd`运行过程中出现的错误，错误有可能是`charCountAdd`本身产生的，也可能是对`data1`计算或`data2`计算中产生的。

2.捕捉单个await表达式的错误
```js
async function charCountAdd(data1,data2) {
  const d1 = await charCount(data1)
    .catch(e=> console.log('d1 is null'));
  const d2 = await charCount(data2)
    .catch(e =>console.log('d2 is null'));
  return d1+d2;	
}

charCountAdd('hello','hi').then(console.log);
```
通过这样的方式捕捉每一个`await`表达式的错误，如果既要捕捉每一个`await`的错误，也要捕捉整个`charCountAdd`函数的错误，可以在调用`charCountAdd`的时候加个`catch`。
```js
...
charCountAdd('hello','hi')
  .then(console.log)
  .catch(console.log); //捕捉整个async/await函数的错误
```
3.同时捕捉多个await表达式的错误

```js
async function charCountAdd(data1,data2) {
  let d1,d2;
  try {
    d1 = await charCount(data1);
    d2 = await charCount(data2);
  }catch (e) {
    console.log('d1 is null');
  }
  return d1+d2;
}
charCountAdd('hello','hi')
  .then(console.log);

function charCount(data) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(data.length);
    },1000);
  });
}
```

### 2.Object.values()

`Object.values()`是一个与`Object.keys()`类似的新函数，但返回的是`Object`自身属性的所有值，不包含继承的值。

假设我们要遍历如下对象obj的所有值：
```js
const obj = {a:1,b:2,c:3};

//不使用Object.values()   ES7
const vals = Object.keys(obj).map(key => obj[key]);
console.log(vals); //[1,2,3]

//使用Object.values()
const values = Object.values(obj1);
console.log(values); //[1,2,3]
// 用这个省去了遍历key，并根据这些key获取value的步骤
```
### 3.Object.entries()

`Object.entries()`函数返回一个给定对象自身可枚举属性的键值对的数组。

接下来遍历obj对象中的所有属性`key`和`value`：
```js
Object.keys(obj).forEach(key => {
  console.log('key:'+key +'value'+obj[key]);
})
//key:a value: 1
//key:b value:2
//key:c value:3

//使用Object.entries()
for(let [key,value] of Object.entries(obj1)) {
  console.log(`key:${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3
```   

### 4.String padding

ES8中新增的两个实例函数`String.prototype.padStart` 和`String.prototype.padEnd`,允许将空字符串或其他字符串添加到原始字符串的开头或结尾。
```js
String.padStart(targetLength,[padString])

//targetLength:当前字符串需要填充到的目标长度，如果这个数值小于当前字符串的长度，则返回当前字符串本身
//padString:(可选)填充字符串，如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧部分，其他部分会被截断，此参数的缺省值为“”

console.log('0.0'.padStart(4,'10')) //10.0
console.log('0.0'.padStart(20))//            0.00

String.padEnd(targetLength,[padString])
//targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
//padString:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " ";  

console.log('0.0'.padEnd(4,'0')) //0.00    
console.log('0.0'.padEnd(10,'0'))//0.00000000
```   

### 5.Object.getOwnProtpertyDescriptors()

`Object.getOwnPropertyDescriptors()`函数用来获取一个对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象
```js
const obj2 = {
  name: 'Jine',
  get age() { return '18' }
};
Object.getOwnPropertyDescriptors(obj2)
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//		value:"Jine",
//		writable:true
//   }
// }
```   
