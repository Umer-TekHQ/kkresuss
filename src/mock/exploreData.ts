import { Images } from '../assets/index';

export type ExploreCardType = {
  title: string;
  description: string;
  image: any; 
};

export type ExploreSectionType = {
  section: 'Trade' | 'Earn' | 'Social' | 'NFTs';
  data: ExploreCardType[];
};

export const exploreSections: ExploreSectionType[] = [
  {
    section: 'Trade',
    data: [
      {
        title: 'Uniswap',
        description: 'Decentralized crypto trading protocol',
        image: Images.trade1,
      },
      {
        title: 'Aerodrome',
        description: 'Trade, earn and provides liquidity',
        image: Images.trade2,
      },
    ],
  },
  {
    section: 'Earn',
    data: [
      {
        title: 'Ex Earn',
        description: 'Stake and earn daily returns',
        image: Images.earn1,
      },
      {
        title: 'StableGrow',
        description: 'Earn interest on stablecoins',
        image: Images.earn2,
      },
    ],
  },
  {
    section: 'Social',
    data: [
      {
        title: 'CryptoChat',
        description: 'Join trading communities',
        image: Images.trade1,
      },
      {
        title: 'BlockFeed',
        description: 'See what traders are doing',
        image: Images.earn2,
      },
    ],
  },
  {
    section: 'NFTs',
    data: [
      {
        title: 'ArtBlocks',
        description: 'Discover generative art',
        image: Images.earn1,
      },
      {
        title: 'RareLoop',
        description: 'Explore rare collectibles',
        image: Images.trade2,
      },
    ],
  },
];
