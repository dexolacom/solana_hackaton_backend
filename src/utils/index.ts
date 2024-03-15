export const getFileName = (fileName: string, nodeenv: string): string => {
  const type = nodeenv === 'production' ? 'mainnet' : 'testnet';
  return `${fileName}-${type}`;
};

export const bigIntPercentMultiply = (value: bigint, percent: number) => {
  return (value * BigInt(percent)) / BigInt(100);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
