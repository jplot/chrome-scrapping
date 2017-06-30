import fs from 'fs'
import path from 'path'

export default class {
  get OUTPUT_PATH() { return path.join(path.dirname(require.main.filename), 'capture') }

  constructor(Page) {
    this.Page = Page
  }

  async image() {
    const Page = this.Page
    const { data } = await Page.captureScreenshot({
      format: 'png',
      fromSurface: true
    })

    this._makeFile('output.png', data)
  }

  async pdf() {
    const Page = this.Page
    const { data } = await Page.printToPDF({
        landscape: true,
        printBackground: true,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    })

    this._makeFile('output.pdf', data)
  }

  _makeDir(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.W_OK, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            fs.mkdir(path, () => resolve())
          } else {
            console.error('Make directory error:', err)
          }

          return
        }

        resolve()
      })
    })
  }

  _makeFile(filename, data) {
    this._makeDir(this.OUTPUT_PATH).then(() => {
      fs.writeFile(`${this.OUTPUT_PATH}/${filename}`, Buffer.from(data, 'base64'), (err) => {
        if (err) {
          console.error('Screenshot error:', err)
        } else {
          console.log('Screenshot saved')
        }
      })
    })
  }
}
