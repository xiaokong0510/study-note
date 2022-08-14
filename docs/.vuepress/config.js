module.exports = {
  title: 'xiao blog',  // 网站的标题，它将会被用作所有页面标题的前缀
  description: '半路出家的 Java 学习之路', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  base: '/study-note/',  // 站点根路径
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],   // 浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: [
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-code-copy', true]
  ],
  themeConfig: {
    logo: '/logo.png',  // 网页顶端导航栏左上角的图标
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    smoothScroll: true,  // 启用页面滚动效果
    //顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '计算机基础', link: '/pages/ComputerBasics/'
      },

      {
        text: '数据结构与算法', link: '/pages/DataStructures&Algorithms/'
      },
      {
        text: 'Java',
        items: [
          { text: '基础', link: '/pages/Java/basic/' },
          { text: '并发', link: '/pages/Java/concurrent/' },
          { text: 'JVM', link: '/pages/Java/JVM/' }
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'MySQL', link: '/pages/Databases/MySQL/' },
          { text: 'Redis', link: '/pages/Databases/Redis/' }
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'SSM', link: '/pages/Framework/SSM/' },
          { text: 'SpringBoot', link: '/pages/Framework/SpringBoot/' },
          { text: 'SpringCloud', link: '/pages/Framework/SpringCloud/' }
        ]
      },
      {
        text: '更多',
        items: [
          { text: '工具', link: '/pages/more/tools/' },

        ]
      },
      //格式三：跳转至外部网页，需http/https前缀
      { text: 'Github', link: 'https://github.com/xiaokong0510' },
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {

      '/pages/Computer Basics/': [
        {
          title: '计算机网络 ',
          path: '/pages/Computer Basics/Network/',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
          ]
        },
        {
          title: '操作系统',
          path: '/pages/Computer Basics/OperatingSystems/',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
          ]
        }
      ],

      '/pages/DataStructures&Algorithms/': [
        {
          title: '左神算法 ',
          path: '/pages/DataStructures&Algorithms/',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            '时间复杂度和简单排序算法',
            '递归行为、归并排序与快排'
          ]
        }
      ],

      '/pages/Databases/MySQL/': [
        {
          title: 'MySQL 45讲 ',
          path: '01-一条SQL查询语句的执行过程',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            '01-一条SQL查询语句的执行过程',
            '02-MySQL的日志系统'
          ]
        }
      ],

      '/pages/Databases/Redis/': [
        {
          title: 'Redis ',
          path: 'Redis入门',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            'Redis入门',
          ]
        }
      ],

      '/pages/Framework/SSM/': [
        {
          title: 'MyBatis ',
          path: 'MyBatis01-JDBC',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            { title: "原生JDBC", path: "MyBatis01-JDBC" },
            { title: "核心配置文件", path: "MyBatis02-MybatisConfig" },
            { title: "一对多、多对一", path: "MyBatis03-Association&Collection" },
            { title: "动态SQL和缓存", path: "MyBatis04-DynamicSql&Cache" }
          ]
        },
        {
          title: 'Spring',
          path: 'Spring01-IOC',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            { title: "IOC和依赖注入", path: "Spring01-IOC" },
            { title: "动态代理和AOP", path: "Spring02-AOP" },
            { title: "声明式事务", path: "Spring03-Transaction" }
          ]
        }
      ],

      '/pages/Framework/SpringBoot/': [
        {
          title: 'SpringBoot 案例 ',
          path: 'demo-helloworld',
          collapsable: false, // 不折叠
          sidebarDepth: 1,
          children: [
            'demo-helloworld',
            'demo-properties',
            'demo-log-aop',
            'demo-validation',
            '接口参数校验异常小结',
            'demo-swagger2',
            'demo-jdbctemplate',
            'demo-jpa',
            'demo-mybatis'
          ]
        }
      ]
    }
  }
}
