import express, { Express, Request, Response } from 'express'
import {rateRouter, subscribeRouter, sendEmailsRouter} from './source/poutes'

const app: Express = express()
const port = 8080

app.use((request: Request, response: Response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'application/json')
    console.log(`${request.method} ${response.statusCode} ${request.path}`)
    next()
})

app.get('/rate', rateRouter)
app.post('/subscribe', subscribeRouter)
app.post('/sendEmails', sendEmailsRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})