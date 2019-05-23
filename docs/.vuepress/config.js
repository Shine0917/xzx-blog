module.exports = {
  title:'xzx blog',
  description:'不断折腾',
  head:[
    ['link',{rel:'icon',href:'/timg.jpeg'}],
    ['link',{rel:'apple-touch-icon',href:'/timg.jpeg'}]
  ],
  base:'/',
  markdown:{
    lineNumbers:true
  },
  themeConfig:{
    nav:[
      {text:'首页',link:'/'},
      {text:'前端',link:'/web-front/'},
      {text:'数据结构与算法',link:'/algorithm/'},
      // {text:'分享',link:'/fx/'},
      {text:'js',link:'/js/'},
      {text:'github',link:'https://github.com/XiaoZhaoxiaaa'}
    ],
    sidebar:{
      '/web-front/':[
          '',
          'es6',
          'html'
    ], 
    '/algorithm/':[
      '/algorithm/',{
        title:'算法标题',  //这个文件夹的README.md不是下拉框形式
        children:[
          '/algorithm/algorithm1', // 以docs为根目录来查找文件
          '/algorithm/algorithm2'
        ]
      }
     
    ]}, //侧边栏配置
    sidebarDepth:2, //侧边栏显示2极
    lastUpdated:'Last Updated',
    searchMaxSuggestoins:10,
    serviceWorker: {
      updatePopup: {
        message:'New content is available',
        buttonText:'Refresh'
      }
    },
    editLinks: true,
    editLinkText:'在 Github上编辑此页！'
  }
}