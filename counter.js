const { Writable, finished } = require('stream')
const prettyBytes = require('pretty-bytes')

function printProgress(start, counter) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  const bytes = prettyBytes(counter)
  const rawSpeed = Math.floor(counter / ((Date.now() - start) / 1000))
  const speed = `${prettyBytes(rawSpeed)}/s`
  const mem = prettyBytes(process.memoryUsage().rss)
  process.stdout.write(`bytes: ${bytes} speed: ${speed} mem: ${mem}`)
}

class Counter extends Writable {
  constructor(options) {
    super(options)
    this.counter = 0
    this.start = Date.now()
    this.timer = setInterval(
      () => printProgress(this.start, this.counter),
      1000
    )
    finished(this, (err) => {
      printProgress(this.start, this.counter)
      clearInterval(this.timer)
      process.stdout.write('\n')
    })
  }
  _write(chunk, enc, done) {
    this.counter += chunk.length
    if (this.counter > 1024 * 1024 * 1024) this.end()
    done()
  }
}

module.exports = Counter
