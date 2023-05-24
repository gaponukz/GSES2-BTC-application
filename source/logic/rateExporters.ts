type supportedSymbols = "btc"

export interface IRateExporter {
    getCurrentPrice(symbol: supportedSymbols): Promise<number>
}

export class MemoryRateExporter implements IRateExporter {
    async getCurrentPrice(symbol: supportedSymbols): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(74.01)
        })
    }
}