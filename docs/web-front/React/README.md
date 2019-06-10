[react技术栈](https://juejin.im/post/5ad9ba6251882567161a1fd8#heading-16)

觉得自己有必要总结梳理一下，现在学的还是很凌乱，顺便完成一些demo

## 用create-react-app 创建一个项目
[参考来自](https://segmentfault.com/a/1190000015301231)

其中值得注意的是各个文件是做什么的

### 在src目录下：
registerServiceWorker.js: service worker 是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务；registerServiceWorker就是为react项目注册了一个service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。注意，registerServiceWorker注册的service worker 只在生产环境中生效，并且该功能只有在https下才能有效果；


[require.ensure()](https://blog.csdn.net/qq_24581629/article/details/75048860)

[与import()的区别](https://blog.csdn.net/sma2mmm/article/details/83827813)

react-redux
在最外层容器中，把所有内容包裹在`Provider`组件中，将之前创建的`store`作为`prop`传给`Provider`

`connect()`接收四个参数
`connect(mapStateToProps,mapDispatchToProps,mergeProps,options)`

`mapStateToProps(state,ownProps): stateProps`
这个函数将store中的数据作为props绑定到组件上

[recat-redux](https://yq.aliyun.com/articles/59428)

[webpack中bundle与chunk的区别](https://stackoverflow.com/questions/42523436/what-are-module-chunk-and-bundle-in-webpack)

[babel升级到7.x](https://segmentfault.com/a/1190000016458913)

[babel自动升级工具](https://juejin.im/post/5b87cab1e51d4538ac05dc54)

[DllPlugin](https://www.cnblogs.com/tugenhua0707/p/9520780.html)

### React生命周期

#### 组件初始化阶段

1.componentWillMount()
组件初始化时调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state

2.render()
react中最重要的步骤，创建虚拟DOM，进行Diff算法，更新dom树都在此进行

render()是一个纯函数，完全根据state和props来决定返回结果，而不产生副作用，所以render中调用setState是错的，因为纯函数不应该引起状态的变化

3.componentDidMount()
组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次

组件的一般初始化都会在这里进行数据请求

#### 组件交互更新时触发的钩子函数

1.componentWillREceiveProps(nextProps)
组件初始化时不调用，组件接受新的props时调用

开发过程中一般只是在这个钩子函数里改变state，此方法中改变state不会二次渲染而是进行state合并

2.shouldComponentUpdate(nextProps,nextState)

react性能优化非常重要的一环，组件接受新的state和props时调用，我们可以设置在此对比前后两个state和props是否相同，如果相同则返回false阻止更新，

3.componentWillUpdate(nextProps,nextState)
组件初始化时不调用，只有在组件将要更新时才调用，

千万不能在这个函数中调用this.setState()方法，会造成循环调用

4.render()同上的render(),创建虚拟dom，进行diff算法，更新dom树

5.componentDidMount()组件初始化时不调用，组件更新完后调用，此时可以获取dom节点

在componentDidUpdate后才能获取更新后的this.state。如果想获取组件默认的props，并且赋值给state，就可以在这里修改，达到UI上的效果

#### 组件卸载时调用

componentWillUnmount()

组件将要卸载时调用，一些事件监听和定时器需要在此清除，还有此组件store上面的值也可以对应的清除

componentWillUnmount执行，重置所有相关参数，在该方法中调用setState不会触发render，因为所有的更新队列，更新状态都会被重置为null。


### React中路由传参及接收参数大方式

#### 方式一 通过params
1.路由表处
```js
<Route path='/sort/:id' component={Sort}></Route>
```
2.Link处
```js
// html方式
<Link to={'/sort/' +'2'} activeClassName='active'>xxxx</Link>
```
```js
// js方式
this.props.router.push('/sort/'+'2')
```
3.sort页面
通过`this.props.params.id` 就可以接受到传递过来到参数（id）

#### 通过query
前提：需要从其他页面跳过来，参数才会被传递过来
注意： 不需要配置路由表，路由表中内容照常
`<Route path='/sort/ ' component={Sort}></Route>`

1.Link处
```js
// html方式
<Link to={{path:'/sort',query:{name:'sunny'}}}>
```

```js
// js方式
this.props.route.push({path:'/sort',query:{name:'sunny'}})
```

2.sort页面
`this.props.location.query.name`

#### 方式三 通过state
同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的，在地址栏

1.Link处
```js
// html方式
<Link to={{path:'/sort',state:{name:'sunny'}}}>
```
```js
// js方式
this.props.route.push({path:'/sort',state:{name:'sunny'}})
```
2.sort页面
`this.props.location.state.name`