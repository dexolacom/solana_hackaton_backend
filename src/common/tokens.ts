import { ERiskType } from 'src/@enums';

export const tokens = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    riskType: ERiskType.LOW,
    coinmarketcapId: 1,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    riskType: ERiskType.MEDIUM,
    coinmarketcapId: 5426,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    riskType: ERiskType.HIGH,
    coinmarketcapId: 1027,
  },
  {
    name: 'Jupiter',
    symbol: 'JUP',
    riskType: ERiskType.MEDIUM,
    coinmarketcapId: 29210,
  },
  {
    name: 'Render',
    symbol: 'RNDR',
    riskType: ERiskType.LOW,
    coinmarketcapId: 5690,
  },
  {
    name: 'Helium',
    symbol: 'HNT',
    riskType: ERiskType.LOW,
    coinmarketcapId: 5665,
  },
  {
    name: 'Bonk',
    symbol: 'BONK',
    riskType: ERiskType.MEDIUM,
    coinmarketcapId: 23095,
  },
  {
    name: 'Pyth Network',
    symbol: 'PYTH',
    riskType: ERiskType.HIGH,
    coinmarketcapId: 28177,
  },
];
