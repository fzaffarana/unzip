/* eslint-env jasmine */
'use strict'

// Modules
let Unzip = require('../../')
let fs = require('fs')
const path = require('path')

describe('Unzip Module Unit Test Suite', () => {
  const mocksPath = path.resolve(__dirname, '../mocks/')
  const unzipMock = fs.readFileSync(`${mocksPath}/test.txt`).toString()

  it('should extract the mock file successfully', async () => {
    try {
      let zipMock = fs.readFileSync(`${mocksPath}/test.zip`)
      let zip = new Unzip(zipMock)
      let unzipData = await zip.extract()
      expect(unzipData).toBe(unzipMock)
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('should throw an error for an invalid or unsupported zip format', async () => {
    try {
      let zip = new Unzip()
      let unzipData = await zip.extract()
      expect(unzipData).toBe(unzipMock)
    } catch (error) {
      expect(error.message).toBe(`There was an error while unzipping file: "Invalid or unsupported zip format. No END header found"`)
    }
  })
})
