const { pipeline } = require('stream')
const https = require('https')
const Counter = require('./counter')

const url = process.argv[2] || require('./url')

https
  .request(url, (res) => {
    pipeline(res, new Counter(), (err) => {
      if (err) console.log(err)
    })
  })
  .end()
