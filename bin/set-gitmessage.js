const gm = require('../')
const fs = require('fs')
const path = require('path')
const cwd  = process.cwd()

const getMessageFilePath = function () {
  try {
    const filepath = path.join(cwd, '../../.gitmessage')
    console.log(filepath)
    fs.accessSync(filepath)
    return filepath
  } catch (error) {
    console.warn('No .gitmessage file found in your project, using default')
    return `${cwd}/.gitmessage`
  }
}

const getArgument = function () {
  return process.argv[2] ? process.argv[2] : getMessageFilePath()
}

const filepath = getArgument()
gm.setGitMessage(filepath, function (error) {
  if (error) {
    console.error('Failed to set git message!')
    console.error(error.stack)
    process.exit(1)
  }

  console.log(`git message set to ${filepath}`)
})
