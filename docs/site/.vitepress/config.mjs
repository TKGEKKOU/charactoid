import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CHARACTOID',
  description: '本地优先的角色 Agent 工作台',
  lang: 'zh-CN',
  base: '/charactoid/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo-mark.svg',
    siteTitle: 'CHARACTOID',
    socialLinks: [{ icon: 'github', link: 'https://github.com/TKGEKKOU/charactoid' }],
    search: { provider: 'local' },
    nav: [
      { text: '入门', link: '/guide/quickstart' },
      { text: '开发', link: '/concepts/architecture' },
      { text: '参考', link: '/reference/events' },
    ],
    sidebar: {
      '/guide/': [
        { text: '入门', items: [{ text: '快速开始', link: '/guide/quickstart' }, { text: '配置角色', link: '/guide/character' }] },
        { text: '运行方式', items: [{ text: 'Web UI', link: '/guide/quickstart#启动服务' }, { text: '桌面端', link: '/guide/quickstart#桌面端' }] },
      ],
      '/concepts/': [
        { text: '概念', items: [{ text: '系统架构', link: '/concepts/architecture' }, { text: 'Agent 生命周期', link: '/concepts/lifecycle' }, { text: 'RAG 与知识资源', link: '/concepts/rag' }, { text: '声音与 Live2D', link: '/concepts/voice-live2d' }] },
      ],
      '/reference/': [
        { text: '参考', items: [{ text: '事件与状态', link: '/reference/events' }, { text: 'Worker 注册', link: '/reference/workers' }, { text: '配置项', link: '/reference/config' }] },
      ],
    },
    outline: 'deep',
    outlineTitle: '本页目录',
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: true,
  },
})
