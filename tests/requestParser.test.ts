import { QueryParser } from '../source/requestParser'

const requestMock = {
    query: {
        field1: 'value1',
        field2: 'value2',
        field3: 'value3',
        field4: 'value4'
    },
    headers: {
        field1: 'value4',
        field2: 'value3',
        field3: 'value2',
        field4: 'value1'
    }
}

describe('One main test', () => {
    const parser = new QueryParser()

    test('Must parse selected fields from request query', () => {
        const fields = ["field1", "field2", "field4"]
        const values = ["value1", "value2", "value4"]
        const result = parser.parse(fields, requestMock as any)

        for (let i = 0; i < 4; i++) {
            expect(result[fields[i]]).toBe(values[i])
        }

        expect(result.field3).toBe(undefined)
        expect(result.another).toBe(undefined)
    })
})