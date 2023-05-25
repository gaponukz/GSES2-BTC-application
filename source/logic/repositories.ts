import fs from 'fs'
import { promisify } from 'util'
import { User } from './enteties'

const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)

export interface IRepository<Entity> {
    getAll(): Promise<Entity[]>
    create(entity: Entity): Promise<void>
    update(entity: Entity, params: any): Promise<Entity>
    delete(entity: Entity): Promise<void>
}

export class UserMemoryRepository implements IRepository<User> {
    private storage: User[]

    constructor () {
        this.storage = []
    }

    async getAll(): Promise<User[]> {
        return this.storage
    }

    async create(entity: User): Promise<void> {
        this.storage.push(entity)
    }

    async update(entity: User, params: any): Promise<User> {
        const newUser = User.fromObject({...entity.toObject(), ...params})

        this.delete(entity)
        this.create(newUser)

        return newUser

    }
    async delete(entity: User): Promise<void> {
        this.storage = this.storage.filter(user => user.gmail != entity.gmail)
    }
}

export class UserJsonFileStorage implements IRepository<User> {
    private readonly filePath: string

    constructor(filePath: string) {
        this.filePath = filePath
    }

    async getAll(): Promise<User[]> {
        const fileContent = await readFileAsync(this.filePath, 'utf8')
        return (JSON.parse(fileContent) as any[]).map(user => User.fromObject(user))
    }

    async create(entity: User): Promise<void> {
        const users = await this.getAll()
        
        users.push(entity)
        await writeFileAsync(this.filePath, JSON.stringify(users), 'utf8')    
    }

    async update(entity: User, params: any): Promise<User> {
        const users = await this.getAll()
        const index = users.findIndex(user => user.gmail === entity.gmail)
        const updatedUser = User.fromObject({ ...entity.toObject(), ...params })
        
        users[index] = updatedUser
        await writeFileAsync(this.filePath, JSON.stringify(users), 'utf8')

        return updatedUser
    }

    async delete(entity: User): Promise<void> {
        const users = await this.getAll()
        const filteredUsers = users.filter(user => user.gmail !== entity.gmail);
        await writeFileAsync(this.filePath, JSON.stringify(filteredUsers), 'utf8')
    }
}
