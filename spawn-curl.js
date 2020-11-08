const { spawn } = require('child_process')
const { pipeline } = require('stream')
const Counter = require('./counter')

const url = process.argv[2] || require('./url')

const curl = spawn('curl', ['-s', url], {
  stdin: ['inherit', 'pipe', 'inherit'],
})

pipeline(curl.stdout, new Counter(), (err) => {
  if (err) console.log(err)
})
