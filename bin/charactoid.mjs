#!/usr/bin/env node
import { existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const args = process.argv.slice(2)
const command = args[0] || 'web'
if (!['web', 'help', '--help', '-h'].includes(command)) {
  console.error(`未知命令：${command}\n用法：npx charactoid-cli web`)
  process.exit(1)
}
if (command !== 'web') {
  console.log('CHARACTOID 一键启动器\n\n用法：npx charactoid-cli web')
  process.exit(0)
}

const root = resolve(process.env.CHARACTOID_HOME || join(process.cwd(), 'charactoid'))
const isWin = process.platform === 'win32'
const run = (program, parameters, options = {}) => {
  const result = spawnSync(program, parameters, { stdio: 'inherit', cwd: options.cwd || root, shell: false })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

if (!existsSync(join(root, '.git'))) {
  mkdirSync(resolve(root, '..'), { recursive: true })
  run('git', ['clone', 'https://github.com/TKGEKKOU/charactoid.git', root], { cwd: process.cwd() })
}

const python = isWin ? join(root, '.venv', 'Scripts', 'python.exe') : join(root, '.venv', 'bin', 'python')
if (!existsSync(python)) {
  const candidates = isWin ? [['py', ['-3.11', '-m', 'venv', '.venv']], ['python', ['-m', 'venv', '.venv']]] : [['python3', ['-m', 'venv', '.venv']], ['python', ['-m', 'venv', '.venv']]]
  let created = false
  for (const [program, parameters] of candidates) {
    const result = spawnSync(program, parameters, { stdio: 'inherit', cwd: root, shell: false })
    if (!result.error && result.status === 0) { created = true; break }
  }
  if (!created) {
    console.error('未找到可用的 Python 3.11。请先安装 Python 3.11，并确保 py 或 python 可用。')
    process.exit(1)
  }
}

run(python, ['-m', 'pip', 'install', '-r', 'requirements.txt'])
run(python, ['-B', 'main.py'])


