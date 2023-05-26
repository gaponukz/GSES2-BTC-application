import fs from 'fs'
import { UserJsonFileStorage } from '../source/logic/repositories'

const filePath = 'testusersdb.json';
const storageMock = [
    { gmail: "user1", hasSubscription: true },
    { gmail: "user2", hasSubscription: true },
    { gmail: "user3", hasSubscription: false },
    { gmail: "user4", hasSubscription: true },
]

describe('Test if kson storage working', () => {
    test('.getAll() method must return correct data', () => {
        fs.writeFile(filePath, JSON.stringify(storageMock), async () => {
            const storage = new UserJsonFileStorage("testusersdb.json")
            const users = await storage.getAll()
            
            for (const user of users) {
                const userInMock = storageMock.find(_user => _user.gmail === user.gmail)

                expect(user.gmail).toBe(userInMock?.gmail)
                expect(user.hasSubscription).toBe(userInMock?.hasSubscription)
            }
        })
    })
    // TODO: test all CRUD functions
})
