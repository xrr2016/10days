const http = require('http')
const process = require('child_process')
const port = 3000

process.spawnSync('echo sdsd')

// const server = http.createServer((req, res) => {
//     // const url = req
// })
// server.listen(port, () => console.log(`Server is running on port: ${port}`))
