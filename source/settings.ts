import * as dotenv from "dotenv"

export interface ISettings {
    readonly gmail: string
    readonly gmailPassword: string
}

export class DotEnvSettings implements ISettings {
    readonly gmail: string
    readonly gmailPassword: string

    constructor() {
        dotenv.config()

        this.gmail = process.env.gmail as string
        this.gmailPassword = process.env.gmailPassword as string
    }
}