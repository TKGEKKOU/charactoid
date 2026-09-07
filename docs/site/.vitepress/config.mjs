import { defineConfig } from 'vitepress'

const section = (title, items) => ({ text: title, collapsed: false, items })

export default defineConfig({
  title: 'CHARACTOID',
  description: '本地优先、角色驱动、可恢复执行的 Agent 工作台',
  lang: 'zh-CN',
  base: '/charactoid/',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/charactoid/favicon.ico' }]],
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'CHARACTOID',
    socialLinks: [{ icon: 'github', link: 'https://github.com/TKGEKKOU/charactoid' }],
    search: { provider: 'local' },
    nav: [
      { text: '入门', link: '/guide/quickstart', activeMatch: '^/guide/' },
      { text: '能力', link: '/capabilities/overview', activeMatch: '^/capabilities/' },
      { text: '设计', link: '/concepts/architecture', activeMatch: '^/concepts/' },
      { text: '开发', link: '/development/agent-worker', activeMatch: '^/development/' },
      { text: '参考', link: '/reference/api', activeMatch: '^/reference/' },
      { text: '排查', link: '/troubleshooting', activeMatch: '^/troubleshooting' },
      { text: 'GitHub', link: 'https://github.com/TKGEKKOU/charactoid' },
    ],
    sidebar: {
      '/guide/': [
        section('入门', [
          { text: '快速开始', link: '/guide/quickstart' },
          { text: '创建第一个角色', link: '/guide/character' },
          { text: '完成一次对话任务', link: '/guide/first-task' },
          { text: '对话与附件', link: '/guide/conversation' },
          { text: '准备本地资源', link: '/guide/resources' },
        ]),
      ],
      '/capabilities/': [
        section('能力总览', [
          { text: '能力地图', link: '/capabilities/overview' },
          { text: '角色与对话', link: '/capabilities/persona-chat' },
          { text: '知识库与记忆', link: '/capabilities/knowledge-memory' },
          { text: '文件与任务', link: '/capabilities/files-runtime' },
          { text: '语音链路', link: '/capabilities/voice' },
          { text: 'Live2D 与外部接入', link: '/capabilities/live2d-integrations' },
          { text: '扩展：Skill、Tool、MCP', link: '/capabilities/extensions' },
          { text: '评测与系统资源', link: '/capabilities/evaluation-resources' },
        ]),
      ],
      '/concepts/': [
        section('系统设计', [
          { text: '系统架构', link: '/concepts/architecture' },
          { text: '数据与边界', link: '/concepts/data-boundaries' },
          { text: 'RAG 设计', link: '/concepts/rag' },
          { text: '声音与 Live2D 设计', link: '/concepts/voice-live2d' },
          { text: '架构总览与能力边界', link: '/concepts/overview' },
          { text: '扩展体系设计', link: '/concepts/extensions' },
          { text: 'API 与模块地图', link: '/concepts/api-map' },
        ]),
      ],
      '/development/': [
        section('开发指南', [
          { text: 'Agent 与 Worker', link: '/development/agent-worker' },
          { text: '任务生命周期', link: '/development/lifecycle' },
          { text: '注册 Worker 与工具', link: '/development/worker-registration' },
          { text: '扩展 Skill 与 MCP', link: '/development/extensions' },
          { text: '工程实践与面试材料', link: '/development/engineering' },
          { text: '文档维护规范', link: '/development/documentation' },
        ]),
      ],
      '/reference/': [
        section('参考手册', [
          { text: 'API 总览', link: '/reference/api' },
          { text: '全量路由清单', link: '/reference/api-all' },
          { text: '角色、对话与运行', link: '/reference/api-agents-runs' },
          { text: '文档、知识与评测 API', link: '/reference/api-knowledge' },
          { text: '语音、RVC 与 Live2D API', link: '/reference/api-voice' },
          { text: '扩展与外部集成 API', link: '/reference/api-integrations' },
          { text: '事件与状态', link: '/reference/events' },
          { text: 'Worker 清单', link: '/reference/workers' },
          { text: '配置项', link: '/reference/config' },
        ]),
      ],
      '/troubleshooting': [
        section('问题排查', [
          { text: '问题排查总表', link: '/troubleshooting' },
          { text: '资源、模型与设备', link: '/troubleshooting/resources' },
          { text: '任务、文件与连接', link: '/troubleshooting/tasks-connections' },
        ]),
      ],
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: true,
    sidebarMenuLabel: '文档菜单',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
  },
  markdown: { lineNumbers: true },
  vite: {
    css: { preprocessorOptions: {} },
  },
})
