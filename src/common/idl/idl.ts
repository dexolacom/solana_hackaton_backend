export const IDL = {
  version: '0.1.0',
  name: 'biscuit',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'treasury',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'createPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'onchainData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mplProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'collectionId',
          type: 'u8',
        },
        {
          name: 'uri',
          type: 'string',
        },
        {
          name: 'tokens',
          type: {
            vec: 'publicKey',
          },
        },
        {
          name: 'percentages',
          type: {
            vec: 'u16',
          },
        },
        {
          name: 'feeIn',
          type: 'u32',
        },
        {
          name: 'feeOut',
          type: 'u32',
        },
      ],
    },
    {
      name: 'buyPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'vaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'record',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'fundingAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentToken',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'portfolioPaymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mplProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splAtaProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
        {
          name: 'uri',
          type: 'string',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'swapPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioPaymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splAtaProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'whirlpoolProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
        {
          name: 'otherAmountThreshold',
          type: {
            vec: 'u64',
          },
        },
        {
          name: 'sqrtPriceLimit',
          type: {
            vec: 'u128',
          },
        },
        {
          name: 'amountSpecifiedIsInput',
          type: {
            vec: 'bool',
          },
        },
        {
          name: 'aToB',
          type: {
            vec: 'bool',
          },
        },
      ],
    },
    {
      name: 'invertSwapPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioPaymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splAtaProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'whirlpoolProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
        {
          name: 'otherAmountThreshold',
          type: {
            vec: 'u64',
          },
        },
        {
          name: 'sqrtPriceLimit',
          type: {
            vec: 'u128',
          },
        },
        {
          name: 'amountSpecifiedIsInput',
          type: {
            vec: 'bool',
          },
        },
        {
          name: 'aToB',
          type: {
            vec: 'bool',
          },
        },
      ],
    },
    {
      name: 'receivePortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mplProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
      ],
    },
    {
      name: 'burnPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userPotrfolioAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentToken',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
        {
          name: 'model',
          type: {
            defined: 'BurnModel',
          },
        },
      ],
    },
    {
      name: 'withdrawPortfolio',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionOnchaindata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'record',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'portfolioData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mplProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splAtaProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'portfolioId',
          type: 'u8',
        },
        {
          name: 'collectionId',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'BiscuitConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'adminAuthority',
            type: 'publicKey',
          },
          {
            name: 'minAmount',
            type: 'u64',
          },
          {
            name: 'treasury',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'BiscuitVault',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'PortfolioCollection',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tokens',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'percentages',
            type: {
              vec: 'u16',
            },
          },
          {
            name: 'feeIn',
            type: 'u32',
          },
          {
            name: 'feeOut',
            type: 'u32',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Portfolio',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'state',
            type: {
              defined: 'PortfolioState',
            },
          },
          {
            name: 'paymentToken',
            type: 'publicKey',
          },
          {
            name: 'paymentAmount',
            type: 'u64',
          },
          {
            name: 'swapIndex',
            type: 'u8',
          },
          {
            name: 'buyer',
            type: 'publicKey',
          },
          {
            name: 'burnParams',
            type: {
              defined: 'BurnParameters',
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'BurnParameters',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'burnModel',
            type: {
              option: {
                defined: 'BurnModel',
              },
            },
          },
          {
            name: 'seller',
            type: 'publicKey',
          },
          {
            name: 'burnPaymentToken',
            type: 'publicKey',
          },
          {
            name: 'swapIndex',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'BurnModel',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Raw',
          },
          {
            name: 'Swap',
          },
        ],
      },
    },
    {
      name: 'PortfolioState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Init',
          },
          {
            name: 'Completed',
          },
          {
            name: 'Burning',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'DataLengthMissmatch',
      msg: 'Portfolio data length is missmatch',
    },
    {
      code: 6001,
      name: 'InvalidPoolForSwap',
      msg: 'Invalid token account for swap',
    },
    {
      code: 6002,
      name: 'InvalidCollectionMetadata',
      msg: 'Invalid collection metadata',
    },
    {
      code: 6003,
      name: 'InvalidNFTId',
      msg: 'Invalid NFT id',
    },
    {
      code: 6004,
      name: 'InvalidSwapIndex',
      msg: 'Invalid swap index',
    },
    {
      code: 6005,
      name: 'PortfolioNotCompleted',
      msg: 'Portfolio not completed',
    },
    {
      code: 6006,
      name: 'PortfolioAlreadyReceived',
      msg: 'Portfolio already received',
    },
    {
      code: 6007,
      name: 'InvalidState',
      msg: 'Invalid state',
    },
    {
      code: 6008,
      name: 'InvalidNFTTokenAccount',
      msg: 'Invalid NFT Token Account',
    },
    {
      code: 6009,
      name: 'InvalidUserTokenAccount',
      msg: 'Invalid User Token Account',
    },
    {
      code: 6010,
      name: 'InvalidATAOwner',
      msg: 'Invalid ATA owner',
    },
    {
      code: 6011,
      name: 'InvalidTreasuryTokenAccount',
      msg: 'Invalid Treasury Token Account',
    },
    {
      code: 6012,
      name: 'InvalidPermissions',
      msg: 'Invalid permissions',
    },
    {
      code: 6013,
      name: 'InvalidRemainingAccountLength',
      msg: 'Invalid remaining account length',
    },
  ],
  metadata: {
    address: 'AguvXyhZXA9WMXfezVHCnz9rjGDPRrDY6FdMcmgSaaKN',
  },
};
