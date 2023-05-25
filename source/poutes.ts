import { Request, Response } from 'express'
import { IRepository } from './logic/repositories'
import { IObserverService } from './logic/observers'
import { IRateExporter } from './logic/rateExporters'
import { User } from './logic/enteties'

import { IRequestParser, QueryParser, HeadersParser } from './requestParser'

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

    rateRouter(request: Request, response: Response) {
        this.rateExporter.getCurrentPrice("btc").then((price: number) => {
            response.send(price.toString())
        })
    }
    
    subscribeRouter(request: Request, response: Response) {
        const user = User.fromObject(this.queryParser.parse(['gmail'], request))

        response.send(`${user.gmail} added`)
    }
    
    sendEmailsRouter(request: Request, response: Response) {
        response.send("Sended")
    }
}
