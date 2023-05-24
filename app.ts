import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = 8080

app.use((request: Request, response: Response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'application/json')
    console.log(`${request.method} ${response.statusCode} ${request.path}`)
    next()
})

app.get('/', (request: Request, response: Response) => {
    response.send({status: "ok"})
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})