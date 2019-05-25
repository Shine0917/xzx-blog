### ES7的特性

includes

指数操作符

#### 1.Array.prototype.includes()

includes()函数用来判断一个数组是否包含有一个指定的值，如果包含则返回true，否则返回false

includes与indexOf很相似，
```js
    arr.includes(x);
    //等价于
    arr.indexOf(x)>=0
    
    再上个例子🌰
    let arr = ['react','angular','vue'];
    if(arr.indexOf('react') !== -1) {
      console.log('react存在')
    }
    
    //等价于
    if(arr.includes('react')) {
      console.log('react存在')
    }
```
#### 2.指数运算符

在ES7中引入了指数运算符,   具有与Math.pow(..)等效的计算结果
```js
    //使用自定义的递归函数calculateExponent或者Math.pow()进行指数运算：
    function calculateExponent(base,exponent) {
      if(exponent === 1) {
        return base;
      }base {
        return base*calculateExponent(base,exponent -1);
      }
    }
    
    console.log(calculateExponent(2,10)) // 输出1024
    console.log(Math.pow(2,10)); //输出1024
    
    //使用指数运算符**，就像+，-等操作符一样：
    console.log(2**10) //输出1024
```   