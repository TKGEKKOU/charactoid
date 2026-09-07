#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, rmSync, renameSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
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
const repo = process.env.CHARACTOID_REPO || 'https://github.com/TKGEKKOU/charactoid.git'
const requiredFiles = ['main.py', 'requirements.txt']

function commandResult(program, parameters, options = {}) {
  return spawnSync(program, parameters, {
    cwd: options.cwd || process.cwd(), encoding: 'utf8',
    stdio: options.silent ? ['ignore', 'pipe', 'pipe'] : 'inherit', shell: false,
  })
}
function exists(program) {
  return commandResult(isWin ? 'where.exe' : 'which', [program], { silent: true }).status === 0
}
function fail(message, hint = '') {
  console.error(`\n[准备失败] ${message}`)
  if (hint) console.error(`解决方法：${hint}`)
  process.exit(1)
}
function ensureCommand(program, hint) {
  if (!exists(program)) fail(`未找到 ${program}。`, hint)
}
function run(program, parameters, options = {}) {
  const result = commandResult(program, parameters, options)
  if (result.error) fail(`无法执行 ${program}：${result.error.message}`)
  if (result.status !== 0) process.exit(result.status || 1)
}
function isCompleteProject(dir) {
  return existsSync(join(dir, '.git')) && requiredFiles.every(file => existsSync(join(dir, file)))
}
function isExpectedRepo(dir) {
  if (!existsSync(join(dir, '.git'))) return false
  const remote = commandResult('git', ['-C', dir, 'config', '--get', 'remote.origin.url'], { silent: true })
  const remoteUrl = (remote.stdout || '').trim().toLowerCase()
  return remote.status === 0 && remoteUrl.includes('github.com/tkgekkou/charactoid')
}
function choosePython() {
  const candidates = isWin
    ? [['py', ['-3.11', '--version']], ['python', ['--version']]]
    : [['python3', ['--version']], ['python', ['--version']]]
  for (const [program, parameters] of candidates) {
    if (!exists(program)) continue
    const result = commandResult(program, parameters, { silent: true })
    const output = `${result.stdout || ''} ${result.stderr || ''}`
    const match = output.match(/Python\s+(\d+)\.(\d+)/i)
    if (result.status === 0 && match && Number(match[1]) === 3 && Number(match[2]) >= 11) return program
  }
  return null
}
async function confirmOverwrite() {
  console.log(`目录 ${root} 中存在未完成或不完整的源码。`)
  console.log('输入 y 清理该目录并重新下载，直接回车取消：')
  process.stdin.setEncoding('utf8')
  const answer = await new Promise(resolveInput => process.stdin.once('data', data => resolveInput(data.trim().toLowerCase())))
  if (!['y', 'yes'].includes(answer)) {
    console.log('已取消，未修改现有目录。')
    process.exit(0)
  }
}

console.log('CHARACTOID 环境检查')
const nodeMajor = Number(process.versions.node.split('.')[0])
if (nodeMajor < 18) fail(`Node.js 版本为 ${process.versions.node}，需要 18 或更高版本。`)
ensureCommand('git', '安装 Git，并确保 git 命令已加入 PATH。')
const pythonCommand = choosePython()
if (!pythonCommand) fail('未找到 Python 3.11 或更高版本。', '安装 Python 3.11，并确保 py 或 python 命令已加入 PATH。')
console.log(`✓ Node.js ${process.versions.node}`)
console.log('✓ Git')
console.log(`✓ ${pythonCommand}（Python 3.11+）`)

if (existsSync(root) && isCompleteProject(root) && !isExpectedRepo(root)) {
  fail('目标目录已有其他项目，未覆盖。', '设置 CHARACTOID_HOME 指向新的空目录。')
}
if (existsSync(root) && !isCompleteProject(root)) {
  await confirmOverwrite()
  rmSync(root, { recursive: true, force: true })
}
if (!isCompleteProject(root)) {
  mkdirSync(dirname(root), { recursive: true })
  const tempRoot = `${root}.download-${process.pid}-${Date.now()}`
  rmSync(tempRoot, { recursive: true, force: true })
  console.log(`\n正在获取 CHARACTOID 源码到临时目录：${tempRoot}`)
  let cloned = false
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    console.log(`下载尝试 ${attempt}/3…`)
    const result = commandResult('git', ['clone', '--depth', '1', '--single-branch', repo, tempRoot], { cwd: process.cwd() })
    if (result.status === 0 && isCompleteProject(tempRoot) && isExpectedRepo(tempRoot)) {
      cloned = true
      break
    }
    rmSync(tempRoot, { recursive: true, force: true })
    if (attempt < 3) console.log('本次下载未完成，准备重试。')
  }
  if (!cloned) fail('源码下载未完成，正式项目目录未被修改。', '检查 GitHub 网络连接、代理设置，或设置 CHARACTOID_REPO 使用可访问的镜像仓库。')
  if (existsSync(root)) rmSync(root, { recursive: true, force: true })
  renameSync(tempRoot, root)
}
if (!isCompleteProject(root) || !isExpectedRepo(root)) fail('源码校验未通过，未启动项目。')

const venvPython = isWin ? join(root, '.venv', 'Scripts', 'python.exe') : join(root, '.venv', 'bin', 'python')
if (!existsSync(venvPython)) {
  console.log('\n正在创建 Python 虚拟环境…')
  run(pythonCommand, pythonCommand === 'py' ? ['-3.11', '-m', 'venv', '.venv'] : ['-m', 'venv', '.venv'], { cwd: root })
}
if (!existsSync(venvPython)) fail('Python 虚拟环境创建失败。', '确认 Python 安装包含 venv 模块，并检查目录写入权限。')
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

