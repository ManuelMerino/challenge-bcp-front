export interface ExchangeRateResponse {
    amount: number;
    amountWithExchangeRate: number;
    originCurrency: string;
    destinationCurrency: string;
    exchangeRate: number;
}
