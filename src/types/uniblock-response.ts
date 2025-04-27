export interface MarketDataResponse {
    success: boolean;
    data: {
        [key: string]: {
            currencies: never[];
            usd: number;
            percentChange24h: number;
            volumeChange24h: number;
        };
    };
}