const { spawn } = require('child_process')
const { pipeline } = require('stream')
const Counter = require('./counter')

const url =
  process.argv[2] ||
  'https://skimdb.npmjs.com/registry/_changes?include_docs=true'
const command = `curl`

const curl = spawn(command, ['-s', url], {
  stdin: ['inherit', 'pipe', 'inherit'],
})

pipeline(curl.stdout, new Counter(), (err) => {
  if (err) console.log(err)
})
