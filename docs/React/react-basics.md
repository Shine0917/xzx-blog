[react技术栈](https://juejin.im/post/5ad9ba6251882567161a1fd8#heading-16)

觉得自己有必要总结梳理一下，现在学的还是很凌乱，顺便完成一些demo

## 用create-react-app 创建一个项目
[参考来自](https://segmentfault.com/a/1190000015301231)

其中值得注意的是各个文件是做什么的

### 在src目录下：
registerServiceWorker.js: service worker 是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务；registerServiceWorker就是为react项目注册了一个service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。注意，registerServiceWorker注册的service worker 只在生产环境中生效，并且该功能只有在https下才能有效果；
