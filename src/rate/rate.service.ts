import { Injectable, Logger } from '@nestjs/common';
// import NodeCache from 'node-cache';
// import { MINUTE_IN_SEC } from 'src/common';

// // Cache
// const nodeCache = new NodeCache({ stdTTL: MINUTE_IN_SEC * 20 });
@Injectable()
export class RateService {
  private logger = new Logger(RateService.name);

  private async getTokenPriceToUSDT(symbol: string) {
    try {
      const res = await fetch(
        `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?symbol=${symbol}&amount=1&convert=USDT`,
        {
          headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY },
        },
      );
      const { data } = await res.json();
      return data?.quote?.USDT.price || 0;
    } catch (error) {
      this.logger.error('getTokenPriceToUSDT error:', error.message);
    }
  }

  async getTokensInfo(symbols: string[]) {
    try {
      const symbolsString = symbols.join(',');
      const res = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbolsString}`,
        {
          headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY },
        },
      );
      const { data } = await res.json();
      return data;
    } catch (error) {
      this.logger.error('getTokenPriceToUSDT error:', error.message);
    }
  }
}
