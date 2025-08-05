import { Images } from '../assets';

type DataProject = {
  id: string;
  title: string;
  label: string;
  name: string;
  logo: any;
};

export const DATA: DataProject[] = [
  {
    id: '1',
    title: 'The first decentralized talent network',
    label: 'Earn',
    name: 'Overnight.fi',
    logo: Images.list1,
  },
  {
    id: '2',
    title: 'Decentralized social media',
    label: 'Earn',
    name: 'Warpcast',
    logo: Images.list2,
  },
  {
    id: '3',
    title: 'The world’s largest web3 marketplace',
    label: 'NFTs',
    name: 'Opensea',
    logo: Images.list3,
  },
  {
    id: '4',
    title: 'Decentralized crypto trading protocol',
    label: 'Trade',
    name: 'Uniswap',
    logo: Images.list4,
  },
  {
    id: '5',
    title: 'Trade, earn and provide liquidity',
    label: 'Earn',
    name: 'Aerodrome',
    logo: Images.list5,
  },
  {
    id: '6',
    title: 'Blockchain-based social platform',
    label: 'Coming soon',
    name: 'Friend.tech',
    logo: Images.list6,
  },
];
