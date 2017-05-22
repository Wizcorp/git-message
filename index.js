const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const async = require('async')

exports.setGitMessage = function (filepath, callback) {
  const projectRoot = path.resolve(process.cwd(), '../..')
  const gitDir = path.join(projectRoot, '.git')

  if (!path.isAbsolute(filepath)) {
    filepath = path.resolve(projectRoot, filepath)
  }

  async.series([
    (callback) => fs.access(filepath, callback),
    (callback) => fs.access(gitDir, callback),
    (callback) => cp.execFile('git', [
      'config',
      '--local',
      'commit.template',
      filepath
    ], callback)
  ], callback)
}
