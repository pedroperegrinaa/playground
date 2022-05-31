// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('data terminal', msg.toString()))

// const stdin = process.stdin
// .on('data', msg => console.log('entrada terminal', msg.toString()))

// const stdout = process.stdin
// .on('data', msg => console.log('saida terminal', msg.toString()))

// stdin.pipe(process.stdout)

// // mostra apenas o saída terminal

import http from 'http'

import { readFileSync, createReadStream } from 'fs'

import fs from 'fs'

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
http.createServer((req, res) => {

    // const file = readFileSync('big.file').toString()
    // res.write(file)
    // res.end()
    
    fs.readFile('teste.txt', (err, data) => {
        console.log(data.toString());
    })

    // createReadStream("big.file")
    // .pipe(res)

}). listen(3000, () => {
    console.log(
        'http://localhost:3000'
    );
})

import net, { Socket } from 'net'

net.createServer(socket => socket.pipe(process.stdout)).listen(8080)