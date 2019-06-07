# Es6特性：
 [[toc]]


[参考来自](https://juejin.im/post/5b9cb3336fb9a05d290ee47e)

### 1.类（class）

Es6引入class，让js的面向对象编程编的更加简单何易于理解
```js
    class Animal {
      //构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参的默认构造函数
      constructor(name,color) {
        this.name = name;
        this.color = color;
      }
      //toString 是原型对象上的属性
      toString() {
        console.log('name' + this.name + ',color:' + this.color);
      }
    }
    
    var animal = new Animal('dog','white'); //实例化Animal
    animal.toString();
    
    console.log(animal.hasOwnProperty('name')); //true
    console.log(animal.hasOwnProperty('toString')); // false
    console.log(animal.__proto__.hasOwnProperty('toString')); //true
    
    class Cat extends Animal {
      constructor(action) {
        //子类必须要在constructor中指定super函数，否则在新建实例对时候会报错
        //如果没有置顶constructor,默认带super函数的constructor将会被添加
        super('cat','white');
        this.action= action;
      }
      toString() {
        console.log(super.toString());
      }
    }
    
    var cat = new Cat('catch');
    cat.toString();
    
    //实例cat是Cat和Animal的实例，和ES5完全一致。
    console.log(cat instanceof Cat); //true
    console.log(cat instanceOf Animal); //true
```    
    

### 2.模块化（Module）

ES5不支持原生的模块化，在ES6中模块作为重要的组成部分被添加进来。模块的功能主要由`export`和`import`组成，每一个模块都有自己单独的作用域，模块之间的相互调用关系是通过`export`来规定模块对外暴露的接口，通过`import`来引用。同时还为模块创造了命名空间，防止函数的命名冲突。

#### 导出（export）

ES6允许在一个模块中使用export来导出多个变量或函数

导出变量
```js
    // test.js
    export var name ='hello'
```
不仅只是变量的导出，同时也支持常量的导出，如下
```js
    export const sqrt = Math.sqrt;  //导出常量
```
Es6将一个文件视为一个模块，上面的模块通过export向外输出了一个变量。一个模块也可以同时向外输出多个变量。
```js
    // test.js
    var name = 'hello';
    var age = '18';
    export {name , age};
```
导出函数
```js
    //demo.js
    export function demo(someArg) {
      return someArg;
    }
```
定义好模块的输出以后就可以在另外一个模块通过import引用
```js
    import {demo} from 'demo' // demo.js
    import {name,age} from 'test'; //test.js
```
一条import语句可以同时导入默认函数和其他变量。 
```js
    import defaultMethod, {otherMethod} from 'XXX.js';
```

### 3.箭头（Arrow）函数

箭头函数包围了它的代码共享同一个`this`，能解决`this`指向问题。

再也不需要用`var self = this; var that = this`这种引用外围`this`模式

箭头函数的结构

箭头函数的箭头 =>之前是一个空括号、单个的参数名、或用括号括起的多个参数名，而箭头函数之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过`return `来返回值，否则返回`undefined`).
```js
    //箭头函数的例子
    （）=> 1
    v => v+1
    (a,v) => a+v
    () => {
      alert('hi');
    }
    e => {
      if(e ==0) {
        return 0;
      }
      return 1000/e;
    }
```
不论是箭头函数还是`bind`，每次被执行都返回的是一个新的函数引用，因此如果能还需要函数引用去做别的事情（如：去卸载监听器），那需要自己保存这个引用。

卸载监听器时的陷阱   这里有待完善啰！！！
```js
    class Menu ectends React.Component {
      componentWillMount() {
    
      }
    }
```


### 4.函数参数默认值

ES6支持在定义函数的时候为其设置默认值：
```js
    function foo(height = 500,color = 'red') {
      //some code
    }
```
不使用默认值：
```js
    function foo (height, color){
      var height = height ||500;
      var color = color || 'red';
      //some code
    }
```
这样写一般没问题，但当参数的布尔值为`false`时，就会出现问题，比如，我们调用`foo()`函数：
```
foo(0,'')
```
因为0的布尔值为`false`，这样`height`的取值会是500，同理`color`为red

所以说，函数参数默认值不仅使代码更简洁而且能规避一些问题。

### 5.模板字符串

ES6支持模板字符串，使得字符串拼接更加简洁，直观。
```js
不使用模板字符串时：var name = 'my name is '+first +''+last+'.'

使用模版字符串：`var name =your name is ${first} ${last}`

    var name = `your name is ${first} ${last}.`
```


### 6.解构赋值

#### 数组解构

从数组中获取值并赋值到变量中，变量的顺序与数组中对象的顺序对应；
```js
    var foo = ['one','two','three', 'four'];
    var [a,b,c,d] = foo;
    console.log(a); //"one"
    console.log(b); //"two"
    console.log(c); //"three"
    console.log(d); //"four"
    
    //如果想忽略某些值，可以按照下面的写法获取想要的值
    var [first,,,last] = foo;
    console.log(first) //"one"
    console.log(last); //"four"
```    
    
如果没有从数组中获取到值，你可以为变量设置一个默认值
```js
    var a,b;
    [a=5,b=7] =[1];
    console.log(a); //1
    console.log(b) // 7
```
#### 对象解构

上回面试这个都没写出来，还说自己用过，感觉好丢人呐，回来赶紧看一下
```js
    const student = {
      name :'xiaoming';
      age:'18';
      city:'shanghai';
    };
    const {name,age,city} = student;
    console.log(name);
    console.log(age);
    console.log(city);
    
    
    let user = {name: '小明', age: 12};
    let {name: userName} = user;
    console.log(userName); //小明
    console.log(name); //undefined  因为name是匹配的模式，userName才是变量，，真正被赋值的是userName
```
属性名与被赋值的变量名是不是一致

1.属性名和变量名不一致

当不一致时，需要显式指定属性名，这样才能把属性值赋值到变量中
```js
    let user = {name:'小明',age:12};
    let {name: userName,age:userAge} = user;
    console.log(userName); //‘小明’
    console.log(userAge); //12
```
其他注意事项：

1.属性不存在，但是依然赋给变量

当要给变量赋值的属性不存在，会给变量提供一个默认值`undefined`
```js
    let user = {name:'小红', age:12};
    let {address:userAddress} = user;
    console.log(userAddress); //undefined
```
2.变量赋予默认值

当要给变量赋值的属性不存在时，变量时能够被赋予默认值
```js
//属性不存在
let user = {name:'小红',age:18};
let {address: userAddress='上海'} = user;
console.log(userAddress); //user中不存在address属性，所以userAddress的值是默认值'上海'

//属性存在
let user = {name:'小花',age:13};
let {name: userName = '小铭'} = user;
console.log(userName); // '小花'   因为属性存在，变量无法获得默认值
```
3.同一个属性赋给多个变量

对象中一个属性值是可以同时赋予给多个变量，
```js
let user = {name:'小明',age:12};
let {name:userName,name: userName1} = user;
console.log(userName); //'小明'
console.log(userName1); //'小明'
```

### 7.扩展操作符（spread operator）

扩展运算符`...`可以在函数调用/数组构造时，将数组表达式或`string`在语法层面展开；还可以在构造对象时，将对象表达式按`key-value`的方式展开；

#### 函数调用
```js
myFunction(...iterableObj);

//运用场景
function sum(x,y,z) {
  return x+y+z;
}
const numbers = [1,2,3];

//不使用扩展运算符
console.log(sum.apply(null,numbers));

//使用扩展运算符
console.log(sum(...numbers)); //6
```

#### 数组构造或字符串
```js
[...iterableObj,'4',...'hello',6];
```  

没有展开语法的时候，只能组合使用`push，splice，concat`等方法，来将已有数组元素变成新数组的一部分，有了展开语法，构造新数组变得更简单优雅：
```js
const students = ['jane','Tom'];
const persons = ['Tony',...students,'Alice','Anne'];
console.log(persons); //['Tony','jane','Tom','Alice','Anne']
```
和参数列表展开类似，`...`在构造数组时，可以在任意位置多次使用

数组拷贝
```js
var arr = [1,2,3];
var arr2 = [...arr]; //等同于arr.slice()
arr2.push(4);
console.log(arr2) //[1,2,3,4]
```

连接多个数组
```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [...arr1,...arr2]; //将arr2中所有元素附加到arr1后面并返回
//等同于
var arr4 = arr1.concat(arr2);
```
构造对象时，进行`clone`或者属性拷贝（ECMAScript2018新增特性）
```js
let objClone = {...obj};
```
在ECMAScript 2018中延展操作符增加了对对象的支持
```js
var obj1 = {foo:'bar',x:42};
var obj2 = {foo: 'baz',y:23};
var cloneObj = {...obj1};
console.log(clonedObj)  //{foo:'bar',x:42}

var mergedObj = {...obj1,...obj2};
mergedObj  // {foo:'baz',x:42,y:23}      为什么foo只有一个值呢
```
#### 在react中的应用

通常我们在封装一个组件时，会对外公开一些`props`用于实现功能，大部分情况下在外部使用都应显示的传递`props`，但是当传递大量的`props`时，会非常繁琐，这是可以用…扩展运算符，用于取出参数对象的所有可遍历属性来进行传递。

一般情况下写法
```
<CustomComponent name="jane" age={12}/>
```
如果使用`...` , 则等同于
```js
const params = {
  name: 'jane',
  age: 12
}
<CustomComponent {...params}/>
```
配合解构赋值避免传入一些不必要的参数
```jsx
var params = {
  name: 'ann',
  title:'head',
  type:'aaa'
}
var {type, ...other} = params;
<CustomComponent type='normal' number = {2} {...other} />

//等同于
<CustomComponent type='normal' number= {2} name='ann' title='head' />
```


对象属性简写

在ES6中允许我们在设置一个对象的属性时不知道属性名
```js
    //常规写法； 对象中必须包含属性和值，显得非常冗余
    const name = 'ming', age='18',city="shanghai";
    const student = {
      name:name,
      age:age,
      city:city
    };
    console.log(student); //{name:"ming",age:"18", city:"shanghai"}
    
    //使用ES6
    
    const name = 'ming', age='18',city="shanghai";
    const student = {
      name,
      age,
      city
    };
    console.log(student); //{name:"ming",age:"18", city:"shanghai"}
 ```   
    
### 8.Promise

`Promise`是异步编程中的一种解决方案，比传统的解决方案`callback`更加优雅，
```js
    //不使用ES6
    //嵌套两个setTimeout回调函数
    setTimeout(fucntion() {
      console.log('hello'); //1秒后输出‘hello’
      setTimeout(function() {
        console.log('hi'); //2秒后输出‘hi'
      },1000)
    },1000);
    
    
    //使用ES6
    var waitSecond = new Promise(function(resolve,reject) {
      setTimeout(resolve,1000);
    });
    
    waitSecond
    .then(function() {
      console.log('hello'); //1秒后输出‘hello'
      return waitSecond;
    });
    .then(function() {
      console.log('hi'); //2秒后输出‘hi'
    });
    
    //上面的代码用两个then来进行异步编程串行化，避免了回调地狱
```   
    

面试官让手写一个Promise




### 9.支持let与const

在之前js是没有块级作用域的，`const`与`let`都是块级作用域

使用`var`定义的变量为函数级作用域；使用`let`与`const`定义的变量为块级作用域：
```js
{
  let a =10;
}
console.log(a); //-1 or Error“ReferenceError: a is not defined”


{
  var a =10;
}
console.log(a); //输出10
```    





1. webpack的plugins和loaders的实现原理



箭头函数与普通函数的区别：

1.箭头函数相当于匿名函数，并且简化了函数定义，箭头函数有两种格式，一种只包含了一个表达式，连`{…}`和`return`都省略了

箭头函数是匿名函数，不能作为构造函数，不能使用`new`
```js
let Animal = () => {
  console.log('111')
}

let cat = new Animal();
```  

箭头函数不绑定 `arguments`，取而代之用`rest`参数`...`解决
```js
function A(a) {
  console.log(arguments);
}
A(1,2,3,4,5,6); // Arguments(6) [1, 2, 3, 4, 5, 6, callee: ƒ, Symbol(Symbol.iterator): ƒ]

let B = (b) => {
  console.log(arguments);
}
B(2,92,32,32)  //Uncaught ReferenceError: arguments is not defined

let C=(...c) => {
  console.log(c);
}
C(3,23,12); //[3,32,12]
```
箭头函数不绑定`this`，会捕获其所在上下文的`this`值，作为自己的`this`值
```js
var obj = {
  a:10,
  b: () => {
    console.log(this.a); //undefined
    console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}    //这里还不是很清楚
  }，
  c:function() {
    console.log(this.a); //10
    console.log(this); //{a:10,b:f,c:f}
  }
}

obj.b();
obj.c();

var obj = {
  a:10,
  b:function() {
    console.log(this.a); //10
  },
  c:function() {
    return () => {
      console.log(this.a); //10
    }
  }
}
obj.b();
obj.c()();
```
箭头函数通过`call()`或`apply()`方法调用一个函数时，只传入一个参数，对`this`并没有影响
```js
let obj2 = {
  a:10,
  b:function(n) {
    let f = (n) =>n+ this.a;
    return f(n);
  },
  c:function(n) {
    let f = (n) => n+this.a;
    let m = {
      a:20
    };
    return f.call(m,n);
  }
};

console.log(obj2.b(1));
console.log(obj2.c(1));
```
箭头函数没有原型属性
```js
var a = () => {
  return 1;
}
function b() {
  return 2;
}
console.log(a.prototype); //undefined
console.log(b.prototype); //{constructor:f}
```
普通函数的`this`指向调用它的那个对象

箭头函数的`this`永远指向其上下文的`this`，任何方法都改变不了其指向，如`call(),bind(),apply()`;



变量提升、函数提升

变量提升：将变量声明提升到它所在作用域最开始的地方
```js
//看🌰吧
console.log(global); //undefined
var global= 'global';
cosole.log(global); //global

function fn() {
  console.log(a); //undefined
  var a = 'abc';
  console.log(a); //aaa
}
fn();


//由于js变量提升，上面代码的实际执行过程是这样的
var global; //变量提升，全局作用域范围内，此时这是声明，并没有赋值
console.log(global);  //undefined
global = 'global'; //此时赋值
console.log(global); //打印出global

function fn() {
  var a;  //变量提升，函数作用域范围内
  console.log(a); //undefined
  a='abc';
  console.log(a);//输出abc
}
```
函数提升


函数定义有三种方式：
```js
var box = function() {}
function box(){}
var box = new Function();
```
函数声明和函数表达式；只有函数声明才存在函数提升

js在进行预解析时函数声明会提升，而函数表达式必须js顺序执行至此函数代码时才会逐行解析
```js
console.log(f1); //function f1(){}
console.log(f2); undefined
function f1(){}
var f2 = function () {}

//由于js中函数提升导致上述代码执行过程如下：
function f1(){}  //函数提升。整个代码块提升到文件最开始  console.log(f1);
console.log(f2);
var f2 = function(){}  //函数表达式不会提升哦！
```   
    

匿名函数：就是没有名字的函数啰
```js
function(){}

//应该怎么调用呢，可以将其赋给一个变量，如下：
var b = function(){
  
}
b(); //在用的时候，用b就相当于使用了右边的函数
```
自执行函数
```js
(function(){
  //some code
})();

//实际上相当于上两步的结合
var b = function() {
  
}
b();
```   
    

自执行函数，可以用来创建命名空间，只是把自己所有的代码都写在这个特殊的函数包装内，在使用的时候值需要用这个奇怪的函数即可，
```js
//自执行函数的运用
for循环 + setTimeout例子
for(var i=0; i<3;i++){
  setTimeout(function() {
    console.log(i);
  },100)
}
//输出结果 3,3,3
```   
    js是单线程执行的，也就是无法同时执行多段代码，当某一段代码正在执行是，所有后续的任务都必须等待，形成一个队列，一旦当前任务执行完毕，再从队列中取出下一个任务。这也称为“阻塞式执行”。所以一次鼠标点击，或者计时器到达时间点，或是Ajax请求完成触发了回调函数，这些事件处理程序或回调函数都不会立即运行，而是立即排队，一旦线程有空闲就执行。假设当前js进程在执行一段很耗时的代码，此时发生了一次鼠标点击，那么实践处理程序就被阻塞，用户无法立即看到反馈，事件处理程序会被放入任务队列，直到前面代码结束以后才会开始执行，
    这也就是说，如果代码中设定了一个setTimeout,那么浏览器会在合适的时间，将代码插入任务队列，如果这个时间设为0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕，所以setTimeout并不能保证执行的时间，是否及时执行取决于js线程是拥挤还是空闲



纯函数(Pure Function)：一种其返回值仅由其参数决定，没有任何副作用(Side Effect)的函数；
```js
//举个例子啦
var arr = [1,2,3,4,5];
arr.slice(0,3); //[1,2,3]
arr.slice(0,3); //[1,2,3]
arr.slice(0,3); //[1,2,3]

这里不管slice执行几次，返回值都是相同的，并且除了返回一个值之外并没有做任何事，所以slice就是一个pure function

var arr = [1,2,3,4,5];
arr.splice(0,3); //[1,2,3]
arr.splice(0,3); //[4,5]
arr.slice(0,3); //[]

这里用splice每执行一次就会影响arr的值，导致每次结果都不同，这样就不是pure function
```
Side Effect

`Side effect `是指一个`function`做了跟本身运算返回值没有关系的事，比如说修改某个全域变数，或是修改传入参数的值，甚至是执行`console.log`都算是`side effect`

`Function programming` 强调没有`side effect`,也就是`function`要保持纯粹，只做运算并返回一个值，没有其他额外的行为。

例如下面几种前端常见的side effect
```
    发送http request
    在画面印出值或是log
    获得使用者input
    Query DOM物件
```

forEach与for的区别

手写ajax

手写Promise

快速排序：

基本思路：双指针+递归分治（本质是一个创建二叉树搜索树的过程）

通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

递归：自己调用自己啰，递归需要设置结束条件
```js
function factorial(n) {
  if(n ===1) {
    return 1;
  }
  return n*factorial(n-1);
}

factorial(3); //6
```
怎么实现一个深拷贝呢？  可以通过递归！



作用域：

1.函数在执行的过程中，先从自己内部找变量

2.如果找不到，再从创建当前函数所在的作用域（词法作用域）去找，以此往上

3.注意找的是变量的当前的状态

函数连同它作用域链上要找的这个变量，共同构成闭包

一般情况下使用闭包主要是为了：

1.封装数据

2.暂存数据
```js
//举个例子：闭包
function car() {
  var speed =0;
  function fn() {
    speed++;
    console.log(speed);
  }
  return fn;
}

var speedUp = car();
speedUp(); //1
speedUp(); //2
```
函数柯里化

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

原型与原型链

每一个对象都从原型链继承属性

所有通过对象直接创建的对象都具有同一个原型对象，并可以通过js代码Object.prototype获得对原型对象的引用



在访问对象的属性时，如果本层没有该属性，JS将向上遍历原型链，直到找到具有所请求名称的属性



为什么引入prototype属性
```js
//有一个Dog的构造函数，表示狗对象的原型
function Dog(name) {
  this.name = name;
}

//对这个构造函数使用new，就会生成一个狗对象对实例
var dogA = new Dog('博美');
console.log(dogA.name);// 博美
```
 这个方法有一个缺点，就是所有原型的属性和方法都是私有的，改变其中一个实例并不会影响其他实例（无法共享属性和方法）；

所以用构造函数设置一个`prototype`属性



这个属性包含一个对象（即：prototype对象），所有实例对象需要共享的属性和方法，都放在这个对象里面。那些不需要共享的属性和方法就放在构造函数里面；

实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的
```js
    //对上述Dog构造函数，用prototype属性进行改写
    function Dog(name) {
      this.name = name;
    }
    
    Dog.prototype.call = function () {
      console.log('汪汪')
    }
    
    var dogA = new Dog('bomei');
    var dogB = new Dog('labuladuo');
    
    dogA.call(); //汪汪
    dogB.call(); //汪汪
    }
```   
    
由于`call`方法放在`prototype`里面，是所有实例对象共享的方法，只要修改了`prototype`对象，就会同时影响到所有实例对象
```js
    Dog.prototype.call = function() {
      console.log(`我是${this.name}`)
    }
    
    var dogA = new Dog('bomei');
    var dogB = new Dog('labuladuo');
    
    dogA.call() //我是bomei
    dogB.call() //我是labuladuo
```
这就是常用的原型模式创建对象

`prototype`是JS在设计面向对象过程中的产物，主要解决了属性和方法共享的问题，从而提高资源的利用率。

而原型链则是原型层层继承的产物。


```js
Object.prototype

Object.prototype.__proto__指向的是null，所以认为Object.prototype是最原始的属性

    Object.prototype.__proto__ === null //true
```


五大原始数据类型，跟据5个基本数据类型，有创建了5个共有属性
```js
    Array.prototype
    Number.prototype
    String.prototype
    Boolean.prototype
    Function.prototype
    
    他们的__proto__ 指向Object.prototype
    Array.prototype.__proto__ = Object.prototype  //true
```
这6个函数对象，是作为这六种类型的构造函数使用，`function`方法将他们的`prototype`属性与各自对应名字的共有属性绑定，并且将它们的`__proto__`统统指向`Function.prototype`,所以最后`function Function()`这个函数对象比较特殊，它的`__proto__`和`prototype`均指向`Function.prototype`属性

`prototype`是一个显式原型属性，只有函数才拥有该属性，基本上所有函数都有这个属性，但也有例外
```
let fun = Function.prototype.bind() //这个函数不具有prototype属性
```
当我们声明一个函数时，这个属性就被自动创建了
```js
    function Foo(){}
    并且这个属性的值是一个对象（也就是原型）,只有一个属性constructor
    
    constructor对应着构造函数，也就是Foo
```

__proto__

这是每个对象都有的隐式原型属性，指向了创建该对象的构造函数的原型

实例对象没有`prototype`属性，实例`__proto__`指向函数的`prototype`
```js
function Foo() {}
let foo = new Foo();
console.log(foo.__proto__ === Foo.prototype)  //true
```


函数式编程

都是表达式不会是陈述式

表达式是一个运算过程，一定会有返回值，例如执行一个`function`
```js
    add(1,2)
```
陈述式则是表现某个行为。例如一个赋值给一个变数

    a=1;


