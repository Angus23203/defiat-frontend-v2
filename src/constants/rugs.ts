export interface RugToken {
  id?:number;
  name:string;
  symbol:string;
  address:string;
  decimals:number;
}

const Rugs:  { [key:string]: { [networkId:number]: RugToken[] }} = {
  Tokens: {
    1: [
      { id: 0, name: 'SantaDAO', symbol: 'HOHO', address: '0x660fDbcebC15a97555CC979f0853454AE65B7f93', decimals: 18 },
      { id: 1, name: 'Eminence', symbol: 'EMN', address: '0x5ade7aE8660293F2ebfcEfaba91d141d72d221e8', decimals: 18 },
      { id: 2, name: 'MYX Network', symbol: 'MYX', address: '0x2129fF6000b95A973236020BCd2b2006B0D8E019', decimals: 18 },
      { id: 3, name: 'BETHERO', symbol: 'HERO', address: '0xB9A1ECcd8324d586B2d95b95Ac75Ea8E6e72154E', decimals: 18 },
      { id: 4, name: 'NEXE Token', symbol: 'NEXE', address: '0xd9F7DEaeB3450cd698FD6d45a7B05A18D84BB1e1', decimals: 18 },
      { id: 5, name: 'CBDAO', symbol: 'CBDAO', address: '0x4639cd8cd52EC1CF2E496a606ce28D8AfB1C792F', decimals: 18 },
      { id: 6, name: 'OnlyUP', symbol: 'ONLYUP', address: '0x58133836f175a629d6A1e100f3f0d849df9aD412', decimals: 18 },
      { id: 7, name: 'HatchDAO', symbol: 'HATCH', address: '0x6F3009663470475F0749A6b76195375f95495fcB', decimals: 18 },
      { id: 8, name: 'yfCyclic', symbol: 'CYCL', address: '0x69f08bd1929ef62ecbe947d6bf76a7b7cdba55e8', decimals: 18 },
      { id: 9, name: 'Debase', symbol: 'DEBASE', address: '0xe20303b4f80ef868f653d1fed3f797b5116c3a2e', decimals: 18 },
      { id: 10, name: 'Synthetic YBDAO', symbol: 'YBREE', address: '0x11f4c6b3e8f50c50935c7889edc56c96f41b5399', decimals: 18 },
      { id: 11, name: 'BlockStake', symbol: 'BLOCK', address: '0x24a1dde6b4f0c144dbe3420f50ec1f5cc56e2d58', decimals: 18 },
      { id: 12, name: 'FOMO Gaming Token', symbol: 'FOMO', address: '0xcc275e3543d42b8a31dcf8ec859f2fbd384b4b57', decimals: 18 },
      { id: 13, name: 'yf12', symbol: 'yf12', address: '0xb1f11700d71164bd755933d96e745617163829fa', decimals: 18 },
      { id: 14, name: 'antiDeFi', symbol: 'aDEFI', address: '0xdc16961915A7704910309173D890B0f5e44c1247', decimals: 0 },
      { id: 15, name: 'ANALYSX', symbol: 'XYS', address: '0x88277055dF2EE38dA159863dA2F56ee0A6909D62', decimals: 6 },
      { id: 16, name: 'NEMOCoin', symbol: 'NEMO', address: '0x957b28f93b0e01557e21e6c564ab26ddc2d18ec5', decimals: 18 },
      { id: 17, name: 'DorayakiToken', symbol: 'DORA', address: '0x59848d60C34dCD2686d7F7918Bd240Fc1890208E', decimals: 18 },
      { id: 18, name: 'Motherbase', symbol: 'MSF', address: '0x0dAF236eb3bCDe380d712B13d1D072c1EEE3Ad98', decimals: 18 },
      { id: 19, name: 'SHARESNFT', symbol: 'SHARE', address: '0xfb48d20fec6f883a4949ca328c9141b88afca428', decimals: 18 },
      { id: 20, name: 'EQUUSMiningToken', symbol: 'EQUUS', address: '0xa462d0e6bb788c7807b1b1c96992ce1f7069e195', decimals: 18 },
      { id: 21, name: 'Hands Of Steel', symbol: 'STEEL', address: '0x6f022e991ea21d26f85f6716c088e2864101dfec', decimals: 0 },
      { id: 22, name: 'KORE', symbol: 'KORE', address: '0x61fb5a2062febc60290b30ab4b93b6d5a71a6d63', decimals: 18 },
      { id: 23, name: 'HEX2T', symbol: 'HEX2T', address: '0xEd1199093b1aBd07a368Dd1C0Cdc77D8517BA2A0', decimals: 18 },
      { id: 24, name: 'MoondustToken', symbol: 'MOONDUST', address: '0x49b16961d006b37e43ea6a943c8c85d5e1d3b8db', decimals: 18 },
      { id: 25, name: 'MOJI Experience Points', symbol: 'MEXP', address: '0xde201daec04ba73166d9917fdf08e1728e270f06', decimals: 18 },
      { id: 26, name: 'YAMI', symbol: 'YAMI', address: '0x6BC6e9468bF2CFfb1A818bbFCc02855e0E4080f3', decimals: 18 },
      { id: 27, name: 'Hikari.Finance', symbol: 'HIKARI', address: '0x064Eb0B52aD9f6b32f95FA29BBdC887dFd33A8Ab', decimals: 18 },
      { id: 28, name: 'YFRay', symbol: 'YFR', address: '0x2b96bf4d483c38d90eb185b996ef6ac48e4b2428', decimals: 18 },
      { id: 29, name: 'lootx.finance', symbol: 'LOOT', address: '0x956fa248d8f3ae8582a60f38a2b8a0ac32adeb5a', decimals: 18 },
      { id: 30, name: 'AntiBooBank', symbol: 'ABOOB', address: '0xcc67c406985088b03190076c6fca4dcc08d8c449', decimals: 18 },
      { id: 31, name: 'PuffCore', symbol: 'PUFF', address: '0x7aa36555bbacd4d937f1768d74c8ebec93ef097f', decimals: 18 },
      { id: 32, name: 'Mystery Token', symbol: 'MYTO', address: '0xBBC47608C2C6E43eeB87E929839FbfB533cA7573', decimals: 18 },
      { id: 33, name: 'luigi.finance', symbol: 'LUIGI', address: '0xa2829832f4a1d9b886a112c2dc87f9f546f69af8', decimals: 18 },
      { id: 34, name: 'AntiYfCoreOrbPriaDefiFarm', symbol: 'fork', address: '0xed7849143BbcE94d039B78bE4d19C24a411BF48e', decimals: 18 },
      { id: 35, name: 'LSD.Travel', symbol: 'LSD', address: '0x231d823778c38783D0608ec9A08A99CFA50B6Cc9', decimals: 18 },
      { id: 36, name: 'CoinOfThePeople', symbol: 'COP', address: '0x40D063D409DE5be4FE6aa45048cE68C7AEc8c152', decimals: 0 },
      { id: 37, name: 'KIMCHI.finance', symbol: 'KIMCHI', address: '0x1E18821E69B9FAA8e6e75DFFe54E7E25754beDa0', decimals: 18 },
      { id: 38, name: 'Honey Farm Finance', symbol: 'HYF', address: '0x016c3d49698bDfa3d58d603A17E5EE31985021a0', decimals: 18 },
      { id: 39, name: 'padthai.finance', symbol: 'PADTHAI', address: '0x6f450f117114075D1D1C91dD64a61C0bA72ca68F', decimals: 18 },
      { id: 40, name: 'XOFI.NETWORK', symbol: 'XOFI', address: '0x5b5AD9F99C96b142E12a8D1F89fd3d2117fd36FF', decimals: 18 },
      { id: 41, name: 'POFI', symbol: 'POFI', address: '0xa420eb11dc020c31e5522a9beb0413e5f0c923ce', decimals: 18 },
      { id: 42, name: 'NOODLE.Finance', symbol: 'NOODLE', address: '0x420ab548b18911717ed7c4ccbf46371ea758458c', decimals: 18 },
      { id: 43, name: 'CREEDV2', symbol: 'CRD', address: '0xba137a98df37b67d5db7e97a2b1cac4272b4e457', decimals: 18 },
    ],
    4: [
      { id: 0, name: 'R_UGGED', symbol: "RUG", address: '0x3Ebbe920B18F5d38bCa5489154388aee2ebE6fF3', decimals: 18 },
      { id: 1, name: 'SHIIIT', symbol: "SHIT", address: '0x4670dC4167f4D80d9597CAecAFED0F529d585589', decimals: 18 },
    ]

  }
}

export default Rugs