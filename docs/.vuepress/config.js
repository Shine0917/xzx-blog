const headConf = require('./config/head')
const navConf = require('./config/nav')
const sidebarConf = require('./config/sidebar')
module.exports = {
  title:'xzx blog',
  description:'不断折腾',
  head:headConf,
  base:'/',
  markdown:{
    lineNumbers:true
  },
  themeConfig:{
    nav: navConf,
    sidebar: sidebarConf, //侧边栏配置
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