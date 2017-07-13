const gm = require('../')
const fs = require('fs')
const path = require('path')

const getMessageFilePath = function () {
  const filepath = '.gitmessage'

  try {
    // Check if a .gitmessage exists in the current project
    fs.accessSync(path.join('../..', filepath))
    return filepath
  } catch (error) {
    console.warn('No .gitmessage file found in your project, using default')
    return path.join('node_modules/git-message', filepath)
  }
}

const getArgument = function () {
  return process.argv[2] ? process.argv[2] : getMessageFilePath()
}

const filepath = getArgument()
gm.setGitMessage(filepath, function (error) {
  if (error) {
    if (error.code === 'ENOENT') {
      console.log(error)
      console.warn('Target project does not exist or is not a git repository, skipping')
      process.exit()
    }

    console.error('Failed to set git message!')
    console.error(error.stack)
    process.exit(1)
  }

  console.log(`git message set to ${filepath}`)
})
