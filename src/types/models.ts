export interface Crypto {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: null | string;
  iconType: IconType;
  iconUrl: string;
  websiteUrl: null | string;
  socials: Link[];
  links: Link[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: string;
  circulatingSupply: number | null;
  totalSupply: number | null;
  approvedSupply: boolean;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: AllTimeHigh;
  penalty: boolean;
}

export interface AllTimeHigh {
  price: string;
  timestamp: number;
}

export enum IconType {
  Pixel = 'pixel',
  Vector = 'vector',
}

export interface Link {
  name: string;
  type: LinkType;
  url: string;
}

export enum LinkType {
  Bitcointalk = 'bitcointalk',
  Discord = 'discord',
  Explorer = 'explorer',
  Facebook = 'facebook',
  Github = 'github',
  Instagram = 'instagram',
  Linkedin = 'linkedin',
  Medium = 'medium',
  Reddit = 'reddit',
  SinaWeibo = 'sina-weibo',
  Telegram = 'telegram',
  Twitter = 'twitter',
  Vkontakte = 'vkontakte',
  Website = 'website',
  Wechat = 'wechat',
  Youtube = 'youtube',
}
