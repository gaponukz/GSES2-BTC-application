import { Request, Response } from 'express'

export function rateRouter(request: Request, response: Response) {
    response.send('0.01')
}

export function subscribeRouter(request: Request, response: Response) {
    response.send("Added")
}

export function sendEmailsRouter(request: Request, response: Response) {
    response.send("Sended")
}