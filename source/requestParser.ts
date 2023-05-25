import { Request } from 'express'

export interface IRequestParser {
    parse<T extends string>(fields: T[], request: Request): Record<T, any>
}

export class QueryParser implements IRequestParser {
    parse<T extends string>(fields: T[], request: Request): Record<T, any> {
        const newObject: Record<T, any> = {} as Record<T, any>;

        for (const field of fields) {
            newObject[field] = request.query[field];
        }
    
        return newObject;
    }
}

export class HeadersParser implements IRequestParser {
    parse<T extends string>(fields: T[], request: Request): Record<T, any> {
        const newObject: Record<T, any> = {} as Record<T, any>;

        for (const field of fields) {
            newObject[field] = request.headers[field];
        }
    
        return newObject;
    }
}
