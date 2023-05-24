export class User {
    gmail: string
    hasSubscription: boolean

    constructor(
        gmail: string,
        hasSubscription: boolean = false
    ) {
        this.gmail = gmail
        this.hasSubscription = hasSubscription
    }

    static fromObject(object: any): User {
        return new User(
            object.gmail,
            object.hasSubscription
        )
    }

    toObject(): any {
        return {
            gmail: this.gmail,
            hasSubscription: this.hasSubscription
        }
    }
}
