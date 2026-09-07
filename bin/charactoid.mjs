#!/usr/bin/env node
import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const args = process.argv.slice(2)
const command = args[0] || 'web'
const usage = 'npx charactoid web'
if (!['web', 'help', '--help', '-h'].includes(command)) {
  console.error(`未知命令：${command}\n用法：${usage}`)
  process.exit(1)
}
if (command !== 'web') {
  console.log(`CHARACTOID 一键启动器\n\n用法：${usage}`)
  process.exit(0)
}

const isWin = process.platform === 'win32'
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const bundledRuntime = join(packageRoot, 'package-runtime')
const configuredRoot = process.env.CHARACTOID_HOME ? resolve(process.env.CHARACTOID_HOME) : null
const defaultRoot = resolve(join(process.cwd(), 'charactoid'))
const requiredFiles = ['main.py', 'requirements.txt']

function commandResult(program, parameters, options = {}) {
  return spawnSync(program, parameters, {
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8',
    stdio: options.silent ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    shell: false,
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
function run(program, parameters, options = {}) {
  const result = commandResult(program, parameters, options)
  if (result.error) fail(`无法执行 ${program}：${result.error.message}`)
  if (result.status !== 0) process.exit(result.status || 1)
}
function isCompleteProject(dir) {
  return Boolean(dir) && requiredFiles.every(file => existsSync(join(dir, file)))
}
function findLocalProject() {
  const candidates = []
  if (configuredRoot) candidates.push(configuredRoot)
  let current = resolve(process.cwd())
  while (current && !candidates.includes(current)) {
    candidates.push(current)
    const parent = dirname(current)
    if (parent === current) break
    current = parent
  }
  const home = process.env.USERPROFILE || process.env.HOME
  if (home) candidates.push(join(home, 'charactoid'))
  if (process.env.LOCALAPPDATA) candidates.push(join(process.env.LOCALAPPDATA, 'charactoid'))
  return candidates.find(isCompleteProject) || null
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
async function confirmOverwrite(target) {
  console.log(`目录 ${target} 中存在上次未完成或不完整的准备。`)
  console.log('输入 y 覆盖并重新准备，直接回车取消：')
  process.stdin.setEncoding('utf8')
  const answer = await new Promise(resolveInput => process.stdin.once('data', data => resolveInput(data.trim().toLowerCase())))
  if (!['y', 'yes'].includes(answer)) {
    console.log('已取消，未修改现有目录。')
    process.exit(0)
  }
}
function openBrowser(url) {
  if (process.env.CHARACTOID_NO_OPEN === '1') return
  if (isWin) {
    spawnSync('cmd.exe', ['/d', '/c', 'start', '', url], { stdio: 'ignore', windowsHide: true })
  } else if (process.platform === 'darwin') {
    spawnSync('open', [url], { stdio: 'ignore' })
  } else if (exists('xdg-open')) {
    spawnSync('xdg-open', [url], { stdio: 'ignore' })
  }
}

console.log('CHARACTOID 环境检查')
const nodeMajor = Number(process.versions.node.split('.')[0])
if (nodeMajor < 18) fail(`Node.js 版本为 ${process.versions.node}，需要 18 或更高版本。`)
const pythonCommand = choosePython()
if (!pythonCommand) fail('未找到 Python 3.11 或更高版本。', '安装 Python 3.11+，并确保 py 或 python 命令已加入 PATH。')
console.log(`✓ Node.js ${process.versions.node}`)
console.log(`✓ ${pythonCommand}（Python 3.11+）`)

const localProject = findLocalProject()
let projectRoot = localProject
if (localProject) {
  console.log(`✓ 已发现本地 CHARACTOID 项目：${localProject}`)
} else {
  const root = configuredRoot || defaultRoot
  if (existsSync(root) && !isCompleteProject(root)) {
    await confirmOverwrite(root)
    rmSync(root, { recursive: true, force: true })
  }
  if (!isCompleteProject(root)) {
    if (!isCompleteProject(bundledRuntime)) {
      fail('npm 包内没有完整运行时文件。', '重新安装 charactoid，或设置 CHARACTOID_HOME 指向已有源码目录。')
    }
    mkdirSync(dirname(root), { recursive: true })
    const tempRoot = `${root}.prepare-${process.pid}-${Date.now()}`
    rmSync(tempRoot, { recursive: true, force: true })
    console.log(`\n正在准备 CHARACTOID 运行时：${root}`)
    cpSync(bundledRuntime, tempRoot, { recursive: true, force: true })
    if (!isCompleteProject(tempRoot)) fail('运行时复制未完成，正式项目目录未被修改。')
    rmSync(root, { recursive: true, force: true })
    cpSync(tempRoot, root, { recursive: true, force: true })
    rmSync(tempRoot, { recursive: true, force: true })
    projectRoot = root
    console.log('✓ 已从 npm 包准备本地运行时')
  } else {
    projectRoot = root
    console.log(`✓ 复用已有 CHARACTOID 项目：${root}`)
  }
}

const venvPython = isWin ? join(projectRoot, '.venv', 'Scripts', 'python.exe') : join(projectRoot, '.venv', 'bin', 'python')
if (!existsSync(venvPython)) {
  console.log('\n正在创建 Python 虚拟环境…')
  run(pythonCommand, pythonCommand === 'py' ? ['-3.11', '-m', 'venv', '.venv'] : ['-m', 'venv', '.venv'], { cwd: projectRoot })
}
if (!existsSync(venvPython)) fail('Python 虚拟环境创建失败。', '确认 Python 安装包含 venv 模块，并检查目录写入权限。')
console.log('✓ Python 虚拟环境')
console.log('\n正在检查并安装基础依赖…')
run(venvPython, ['-m', 'pip', 'install', '--disable-pip-version-check', '-r', 'requirements.txt'], { cwd: projectRoot })
console.log('✓ Python 基础依赖')
const envFile = join(projectRoot, '.env')
const envExample = join(projectRoot, '.env.example')
if (!existsSync(envFile) && existsSync(envExample)) {
  copyFileSync(envExample, envFile)
  console.log('✓ 已创建 .env；外部服务密钥和可选模型仍按需配置')
}
const url = 'http://127.0.0.1:18000'
console.log(`\nCHARACTOID Web: ${url}`)
console.log('正在打开浏览器…')
openBrowser(url)
console.log('按 Ctrl+C 停止 CHARACTOID。\n')
run(venvPython, ['-B', 'main.py'], { cwd: projectRoot })
