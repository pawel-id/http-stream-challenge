# Http stream performance challenge

compare stream performance of node.js internal http request implementation (`npm
run http-request`) vs those provided by operating system curl (`npm run
spawn-curl`)


## results 

mac book pro, 500 Gb/s link

```
spawn-curl
bytes: 1.07 GB speed: 9.14 MB/s mem: 43.3 MB

http-request
bytes: 1.07 GB speed: 8.68 MB/s mem: 68.6 MB
```