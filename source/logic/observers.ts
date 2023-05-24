import { User } from './enteties'
import { IRepository } from './repositories'
import { IRateExporter } from './rateExporters'

export interface IObserverService {
    notify(storage: IRepository<User>, exporter: IRateExporter): Promise<void>
}

abstract class ObserverServiceTemplate implements IObserverService {
    abstract sendNotification(user: User, price: number): Promise<void>

    async notify(storage: IRepository<User>, exporter: IRateExporter): Promise<void> {
        storage.getAll().then(users => {
            exporter.getCurrentPrice("btc").then(async price => {
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