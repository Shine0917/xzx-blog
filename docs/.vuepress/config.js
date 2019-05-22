module.exports = {
  title:'xzx blog',
  description:'不断折腾',
  head:[
    ['link',{rel:'icon',href:'/timg.jpeg'}],
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
      {text:'github',link:'https://github.com/XiaoZhaoxiaaa'}
    ],
    sidebar:'auto',  //侧边栏配置
    sidebarDepth:2, //侧边栏显示3极
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