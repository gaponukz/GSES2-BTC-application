import { Request, Response } from 'express'
import { IRepository } from './logic/repositories'
import { IObserverService } from './logic/observers'
import { IRateExporter } from './logic/rateExporters'
import { User } from './logic/enteties'

import { IRequestParser, QueryParser } from './requestParser'

export default class Router {
    private readonly storage: IRepository<User>
    private readonly rateExporter: IRateExporter
    private readonly observer: IObserverService
    private queryParser: IRequestParser

    constructor (
        storage: IRepository<User>,
        rateExporter: IRateExporter,
        observer: IObserverService
    ) {
        this.storage = storage
        this.rateExporter = rateExporter
        this.observer = observer

        this.queryParser = new QueryParser()
    }

    async rateRouter(request: Request, response: Response) {
        this.rateExporter.getCurrentPrice("btc").then((price: number) => {
            response.send(price.toString())
        })
    }
    
    async subscribeRouter(request: Request, response: Response) {
        const user = User.fromObject(this.queryParser.parse(['gmail'], request))
        const users = await this.storage.getAll()

        if (users.find(_user => _user.gmail === user.gmail)) {
            response.status(400)
            response.send('Already in subscribed')

        } else {
            user.hasSubscription = true
            await this.storage.create(user)
            response.send(`Added`)
        }
    }
    
    async sendEmailsRouter(request: Request, response: Response) {
        this.observer.notify(this.storage, this.rateExporter).then(() => {
            response.send("Sended")
        })
    }
}
