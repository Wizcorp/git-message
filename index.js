const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const async = require('async')

exports.setGitMessage = function (filepath, callback) {
  const gitDir = path.join(process.cwd(), '../../.git')
  fs.access('/.dockerenv', function (error) {
    if (!error) {
      console.log('Running in docker, cowardly skipping install')
      return callback()
    }

    async.series([
      (callback) => fs.access(filepath, callback),
      (callback) => fs.access(gitDir, callback),
      (callback) => cp.exec(`git config --local commit.template ${filepath}`, callback)
    ], callback)
  })
}
