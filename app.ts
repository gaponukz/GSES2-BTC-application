import express, { Express, Request, Response } from 'express'
import { ConsoleObserverService } from './source/logic/observers'
import { CoingeckoExporter } from './source/logic/rateExporters'
import { UserJsonFileStorage } from './source/logic/repositories'
import Router from './source/poutes'

const port = 8080
const app: Express = express()

const router = new Router(
    new UserJsonFileStorage("users.json"),
    new CoingeckoExporter(),
    new ConsoleObserverService()
)

app.use((request: Request, response: Response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'application/json')
    console.log(`${request.method} ${response.statusCode} ${request.path}`)
    next()
})

app.get('/rate', router.rateRouter.bind(router));
app.post('/subscribe', router.subscribeRouter.bind(router));
app.post('/sendEmails', router.sendEmailsRouter.bind(router));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
