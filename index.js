const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const async = require('async')
const ini = require('ini')

exports.setGitMessage = function (filepath, callback) {
  const projectRoot = path.resolve(process.cwd(), '../..')
  process.chdir(projectRoot)

  const gitConfig = '.git/config'

  if (path.isAbsolute(filepath)) {
    filepath = path.relative(filepath, projectRoot)
  }

  async.series([
    (callback) => fs.access(filepath, callback),
    (callback) => fs.access(gitConfig, callback),
    (callback) => fs.readFile(gitConfig, (error, data) => {
      if (error) {
        return callback(error)
      }

      const config = ini.parse(data.toString())

      if (!config.commit) {
        config.commit = {}
      }

      config.commit.template = filepath

      fs.writeFile(gitConfig, ini.stringify(config), callback)
    })
  ], callback)
}
