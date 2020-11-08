const { Writable } = require('stream')
const prettyBytes = require('pretty-bytes')

function printProgress(counter, start) {
  process.stdout.clearLine()
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  const bytes = prettyBytes(counter)
  const speed = `${prettyBytes(counter / ((Date.now() - start) / 1000))}/s`
  const mem = prettyBytes(process.memoryUsage().rss)
  process.stdout.write(`bytes: ${bytes} speed: ${speed} mem: ${mem}`)
}

class Counter extends Writable {
  constructor(options) {
    super(options)
    this.counter = 0
    this.start = Date.now()
    this.timer = setInterval(
      () => printProgress(this.counter, this.start),
      1000
    )
  }
  _write(chunk, enc, done) {
    this.counter += chunk.length
    done()
  }

  _final(done) {
    printProgress(this.counter)
    clearInterval(this.timer)
    done()
  }
}

module.exports = Counter
