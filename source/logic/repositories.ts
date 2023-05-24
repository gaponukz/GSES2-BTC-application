import { User } from './enteties'

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
