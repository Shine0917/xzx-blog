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