'use strict'

// Modules
const AdmZip = require('adm-zip')
const tmp = require('tmp')
const fs = require('fs')

class Unzip {
  /**
   * @param {Object} zipData - Buffer with the zipped data
   */
  constructor (zipData) {
    this.zipData = zipData
  }

  /**
   * Extract the zipped data
   * @public
   */
  async extract () {
    try {
      // We create a temporal file with the compressed data
      const zipFile = tmp.fileSync({ postfix: '.zip' })
      fs.writeFileSync(zipFile.name, this.zipData)

      // Unzip file in a temporal dir
      const unzipFile = new AdmZip(zipFile.name)
      let tmpDir = tmp.dirSync()
      unzipFile.extractAllTo(tmpDir.name)

      // Read uncompress file
      let files = fs.readdirSync(tmpDir.name)
      let file = files.filter(file => !file.includes('__MACOSX'))[0]
      let unzipData = fs.readFileSync(`${tmpDir.name}/${file}`).toString()

      // Destroy temporal file/dir
      tmp.setGracefulCleanup()

      return unzipData
    } catch (err) {
      throw new Error(`There was an error while unzipping file: ${JSON.stringify(err)}`)
    }
  }
}

module.exports = Unzip
