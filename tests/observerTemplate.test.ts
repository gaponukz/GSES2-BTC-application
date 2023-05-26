import { User } from '../source/logic/enteties'
import { IRateExporter }  from '../source/logic/rateExporters'
import { IRepository }  from '../source/logic/repositories'
import { ObserverServiceTemplate }  from '../source/logic/observers'

const btcPrice = 113

class MockUserStorage implements IRepository<User> {
    async getAll(): Promise<User[]> {
        return [
            new User("user1", true),
            new User("user2", true),
            new User("user3", false),
            new User("user4", true),
        ]
    }

    async create(entity: User): Promise<void> {}
    async delete(entity: User): Promise<void> {}
    async update(entity: User, params: any): Promise<User> {
        return User.fromObject({})
    }
}

type supportedSymbols = "btc"

class MockRateExporter implements IRateExporter {
    async getCurrentPrice(symbol: supportedSymbols): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(btcPrice)
        })
    }
}

describe('Test if ObserverServiceTemplate logic is correct', () => {
    let prices: number[] = []
    let users: User[] = []

    class MockObserver extends ObserverServiceTemplate {
        async sendNotification(user: User, price: number): Promise<void> {
            prices.push(price)
            users.push(user)
        }
    }

    const observer = new MockObserver()
    const storage = new MockUserStorage()
    const exporter = new MockRateExporter()

    test('Price must be from exporter, users must be only from storage and with subscription', () => {
        observer.notify(storage, exporter).then(() => {
            expect(prices.every(price => price == btcPrice)).toBe(true)
            expect(users.every(user => ['user1', 'user2', 'user4'].includes(user.gmail))).toBe(true)
        })
    })
})
