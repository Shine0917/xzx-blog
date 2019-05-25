# 这是es6文档

## 二级啊
### 三级奥迪

面试题：

JavaScript 怎么快速声明一个数组，长度为 100，元素全是 0？
```js
1.new Array(101).join(0).split('');
2.Array.apply(null,{length:100}).fill(0);
3.Array(100).fill(0);
4.var arr = new Array(100); arr = arr.map(item => 0);
5.[...Array(100).fill(0)];
6.用Loadsh  _.fill(Array(100),0);
7.Array.from({length:100},_ =>0)
8.Array.prototype.fill()
```
Object.prototype.toString.call()

数组原型提供的方法有很多：主要分为三种：

1.会改变自身值的

2.不会改变自身值的

3.遍历方法
```js
    Object.getOwnPropertyNames(Array.prototype); //获取Array.prototype的所有方法
    //(33) ["length", "constructor", "concat", "copyWithin", "fill", "find", "findIndex", "lastIndexOf", "pop", "push", "reverse", "shift", "unshift", "slice", "sort", "splice", "includes", "indexOf", "join", "keys", "entries", "values", "forEach", "filter", "flat", "flatMap", "map", "every", "some", "reduce", "reduceRight", "toLocaleString", "toString"]
  ```  

改变自身值的方法（9个）
```js
pop, push, reverse, shift, sort, splice, unshift, copyWithin, fill
```
对于能改变自身值的数组方法，日常开发需要特别注意，尽量避免在循环遍历中去改变原数组的项，

pop



### JS function 调用方式

1.当作函式调用

2.当作方法调用

3.间接调用

4.当作建模式调用



#### 当作函式调用：在非严格模式下，全域：window
```js
严格模式下： undefined

    //当作函式调用：
    this的值：
    在非严格模式下，全域：window
    
    
    function test() {
      console.log(this);
    }
    test() //window
    
    (function() {
    'use strict'
      function test() {
          console.log(this)
      }
      test();  //undefined   严格模式下： undefined
    
    }())
```

  #### 2.当作方法调用
  ```js
    var person = {
      name:'Hane'
      eat: function() {
      console.log('eat');
      console.log(this);  //方法执行时所属的物件
    }
    }
    
    person.eat();
```

  #### 3.间接调用 call() apply()
  ```js
    function test() {
      console.log(this)
    }
    test.call({name:'call'});
    //这个物件传给了test
    [object Object] {name:'call'}
    
    function test(x,y,z) {
      console.log(this)
    }
    test.call({name:'call'},1,2,3);  //输出{name:"call"}
    test.apply({name:'apply'},[1,2,3]);   //输出{name:"apply"}
    从这也可以看出call()跟apply()的区别，传参第一个都是this，主要是第二个的差异，call需要将参数展开，aply是传递一个数组
```    

  #### 4.当作构造函数调用
  ```js
    function Car() {
      //实际上是建了一个空的this
      //this = {};
    	this.name = 'car';
    }
    var car1 = new Car();
    console.log(car1); //{name:"car"}
    
```
```js
prototype

    function Car() {
      this.name= 'car';
    }
    
    Car.prototype.boot = function() {
      console.log('boot');
    }
    var car1 = new Car();
    console.log(car1.boot());  //"boot" 
    先在自己的属性里找，如果没有就会去它的原型里找，
```   

### 手写ajax步骤：

1.创建XMLHttpRequest

2.指定响应函数

3.打开连接（指定请求）：使用XMLHttpRequest对象的open() 方法

4.发送Http请求

5.创建响应函数


```js
    var twoSum = function(nums, target) {
      let result =[];
      nums.map((item,index) => {
        if(nums.indexOf(target -item) > -1 && nums.indexOf(target -item) != index) {
          result = [index,nums.indexOf(target -item)].sort((a,b) => a>b);
        }
      });
      return result;
    }
    
    
    var twoSum = function(nums, target) {
        let numbers=[];
        nums.map((item1,key1)=>{
           nums.map((item2,key2)=>{
               if(key2>key1&&item1+item2===target){
                     numbers=[key1,key2]
               }
           })
        });
        return numbers
    };
  ```
### 函数柯里化
 函数柯里化：主要作用和特点就是参数复用、提前返回和延迟执行

把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数
```js
    function curry(fn,args) {
      var length = fn.length;
      var args = args ||[];
      return function() {
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if(newArgs.length <length) {
          return curry.call(this,fn,newArgs);
        }else {
          return fn.apply(this,newArgs);
        }
      }
    }
    
    function multiFn(a,b,c) {
    	return a*b*c
    }
    
    var multi = curry(multiFn);
    multi(2)(3)(4);
    multi(2,3,4);
    multi(2)(3,4);
    multi(2,3)(4);
```




观察者模式


