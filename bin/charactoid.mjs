#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const args = process.argv.slice(2)
const command = args[0] || 'web'
const usage = 'npx charactoid-cli web'
if (!['web', 'help', '--help', '-h'].includes(command)) {
  console.error(`未知命令：${command}\n用法：${usage}`)
  process.exit(1)
}
if (command !== 'web') {
  console.log(`CHARACTOID 一键启动器\n\n用法：${usage}`)
  process.exit(0)
}

const isWin = process.platform === 'win32'
const root = resolve(process.env.CHARACTOID_HOME || join(process.cwd(), 'charactoid'))
const repo = 'https://github.com/TKGEKKOU/charactoid.git'

function commandResult(program, parameters, options = {}) {
  return spawnSync(program, parameters, {
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8',
    stdio: options.silent ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    shell: false,
  })
}
function exists(program) {
  const result = commandResult(isWin ? 'where.exe' : 'which', [program], { silent: true })
  return result.status === 0
}
function fail(message, hint = '') {
  console.error(`\n[准备失败] ${message}`)
  if (hint) console.error(`解决方法：${hint}`)
  process.exit(1)
}
function ensureCommand(program, hint) {
  if (!exists(program)) fail(`未找到 ${program}。`, hint)
}
function checkNode() {
  const major = Number(process.versions.node.split('.')[0])
  if (major < 18) fail(`Node.js 版本为 ${process.versions.node}，需要 18 或更高版本。`, '安装 Node.js 18 LTS 或更高版本后重试。')
}
function choosePython() {
  const candidates = isWin
    ? [['py', ['-3.11', '--version']], ['python', ['--version']]]
    : [['python3', ['--version']], ['python', ['--version']]]
  for (const [program, parameters] of candidates) {
    if (!exists(program)) continue
    const result = commandResult(program, parameters, { silent: true })
    if (result.status !== 0) continue
    const output = `${result.stdout || ''} ${result.stderr || ''}`
    const match = output.match(/Python\s+(\d+)\.(\d+)/i)
    if (match && Number(match[1]) === 3 && Number(match[2]) >= 11) return program
  }
  return null
}
function run(program, parameters, options = {}) {
  const result = commandResult(program, parameters, options)
  if (result.error) fail(`无法执行 ${program}：${result.error.message}`)
  if (result.status !== 0) process.exit(result.status || 1)
}

console.log('CHARACTOID 环境检查')
checkNode()
ensureCommand('git', '安装 Git，并确保 git 命令已加入 PATH。')
const pythonCommand = choosePython()
if (!pythonCommand) fail('未找到 Python 3.11 或更高版本。当前项目至少需要 Python 3.11。', '推荐安装 Python 3.11，并确保 py 或 python 命令已加入 PATH。')
console.log(`✓ Node.js ${process.versions.node}`)
console.log('✓ Git')
console.log(`✓ ${pythonCommand}（Python 3.11）`)

const gitDir = join(root, '.git')
const isExpectedRepo = () => {
  if (!existsSync(gitDir)) return false
  const remote = commandResult('git', ['-C', root, 'config', '--get', 'remote.origin.url'], { silent: true })
  const remoteUrl = (remote.stdout || '').trim().toLowerCase()
  return remote.status === 0 && remoteUrl.includes('github.com/tkgekkou/charactoid')
}
if (existsSync(root) && !isExpectedRepo() && !existsSync(join(root, 'main.py'))) {
  console.log(`目录 ${root} 中存在上次未完成的下载。`)
  console.log('输入 y 覆盖并重新准备，直接回车取消：')
  const input = await new Promise(resolveInput => {
    process.stdin.setEncoding('utf8')
    process.stdin.once('data', data => resolveInput(data.trim().toLowerCase()))
  })
  if (input !== 'y' && input !== 'yes') {
    console.log('已取消，未修改现有目录。')
    process.exit(0)
  }
  rmSync(root, { recursive: true, force: true })
}
if (existsSync(gitDir) && !isExpectedRepo()) {
  fail('目标目录已有其他 Git 仓库，未覆盖。', '选择新的 CHARACTOID_HOME，或人工确认后清理该目录。')
}
if (!existsSync(gitDir)) {
  mkdirSync(resolve(root, '..'), { recursive: true })
  console.log(`
正在获取 CHARACTOID 源码到：${root}`)
  run('git', ['clone', '--depth', '1', '--single-branch', '--filter=blob:none', repo, root], { cwd: process.cwd() })
}if (!existsSync(join(root, 'main.py')) || !existsSync(join(root, 'requirements.txt'))) {
  fail(`目录 ${root} 不是完整的 CHARACTOID 源码目录。`, '删除该目录后重新执行，或设置 CHARACTOID_HOME 指向正确目录。')
}

const venvPython = isWin ? join(root, '.venv', 'Scripts', 'python.exe') : join(root, '.venv', 'bin', 'python')
if (!existsSync(venvPython)) {
  console.log('\n正在创建 Python 虚拟环境…')
  run(pythonCommand, isWin && pythonCommand === 'py'
    ? ['-3.11', '-m', 'venv', '.venv']
    : ['-m', 'venv', '.venv'], { cwd: root })
}
if (!existsSync(venvPython)) fail('Python 虚拟环境创建失败。', '确认 Python 安装包含 venv 模块，并检查当前目录写入权限。')

console.log('\n正在检查并安装 Python 基础依赖…')
run(venvPython, ['-m', 'pip', 'install', '--upgrade', 'pip'], { cwd: root })
run(venvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt'], { cwd: root })

const envFile = join(root, '.env')
const envExample = join(root, '.env.example')
if (!existsSync(envFile) && existsSync(envExample)) {
  copyFileSync(envExample, envFile)
  console.log('✓ 已从 .env.example 创建 .env；密钥和外部服务仍需按需填写。')
}
console.log('\n环境准备完成，正在启动 CHARACTOID…')
run(venvPython, ['-B', 'main.py'], { cwd: root })
