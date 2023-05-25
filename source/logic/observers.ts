import nodemailer from 'nodemailer'
import { User } from './enteties'
import { IRepository } from './repositories'
import { IRateExporter } from './rateExporters'
import { ISettings } from '../settings'

export interface IObserverService {
    notify(storage: IRepository<User>, exporter: IRateExporter): Promise<void>
}

abstract class ObserverServiceTemplate implements IObserverService {
    abstract sendNotification(user: User, price: number): Promise<void>

    async notify(storage: IRepository<User>, exporter: IRateExporter): Promise<void> {
        storage.getAll().then(users => {
            exporter.getCurrentPrice("btc").then(async price => {
                users = users.filter(user => user.hasSubscription)
                
                for (const user of users) {
                    await this.sendNotification(user, price)
                }
            })
        })
    }
}

export class ConsoleObserverService extends ObserverServiceTemplate {
    async sendNotification(user: User, price: number): Promise<void> {
        console.log(`${user.gmail} got message: btc for ${price}`)
    }
}

export class EmailNotificationObserver extends ObserverServiceTemplate {
    private settings: ISettings

    constructor(settings: ISettings) {
        super()
        this.settings = settings
    }

    async sendNotification(user: User, price: number): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: this.settings.gmail,  pass: this.settings.gmailPassword
            }
        })

        const mailOptions = {
            from: this.settings.gmail,
            to: user.gmail,
            subject: "BTC/UAH price!",
            text: price.toString()
        }

        await transporter.sendMail(mailOptions)
    }
}