module.exports = {
  title: 'xiao blog',  // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '半路出家的 Java 学习之路', //描述
  base: '/study-note/',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],   //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    logo: '/logo.png',  //网页顶端导航栏左上角的图标
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    //顶部导航栏
    nav: [
      { text: '首页', link: '/' },  //格式一：直接跳转，'/'为不添加路由，跳转至首页
       //格式二：添加下拉菜单，link 指向的文件路径
      {
        text: '计算机基础',
        items: [
          { text: '计算机网络', link: '/MySQL' },
          { text: '操作系统', link: '/Redis' }
        ]
      },
      {
        text: '数据结构与算法',
        items: [
          { text: '数据结构', link: '/MySQL' },
          { text: '算法', link: '/Redis' }
        ]
      },
      {
        text: 'Java',
        items: [
          { text: '基础', link: '/MySQL' },
          { text: '集合', link: '/Redis' },
          { text: '并发', link: '/Redis' },
          { text: 'JVM', link: '/Redis' }
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'MySQL', link: '/MySQL' },
          { text: 'Redis', link: '/Redis' }
        ]
      },
      {
        text: '常用框架',
        items: [
          { text: 'MyBatis', link: '/MySQL' },
          { text: 'Spring', link: '/Redis' },
          { text: 'SpringMVC', link: '/Redis' },
          { text: 'SpringBoot', link: '/Redis' }
        ]
      },
      { text: '中间件', link: '/MySQL' },
      { text: '工具', link: '/MySQL' },
      //格式三：跳转至外部网页，需http/https前缀
      { text: 'Github', link: 'https://github.com/xiaokong0510' },
    ]
  },
  //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
  sidebar: { 
    '/pages/folder1/':[         
      {
          title: '测试菜单1',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
              ['test1.md', '子菜单1'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
              ['test3.md', '子菜单2']
          ]
      },
      {
          title: '测试菜单2',
          collapsable: false, 
          children: [
              ['test2.md', '子菜单1']
          ]
      }
  ]
  }
}
