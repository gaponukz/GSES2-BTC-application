import axios from 'axios'

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

export class CoingeckoExporter implements IRateExporter {
    private readonly apiUrl = 'https://api.coingecko.com/api/v3/simple/price'
    private readonly vsCurrencies = 'uah'
    private availableCurrencies: Record<supportedSymbols, string> = {"btc": "bitcoin"}

    async getCurrentPrice(symbol: supportedSymbols): Promise<number> {
        const currency = this.availableCurrencies[symbol]
        const response = await axios.get(this.apiUrl, {
            params: {
                ids: currency,
                vs_currencies: this.vsCurrencies,
            },
        })

        return response.data[currency][this.vsCurrencies]
    }
}
