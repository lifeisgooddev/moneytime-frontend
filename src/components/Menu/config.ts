import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Dashboard',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
    icon: 'TradeIcon',
    href: 'https://exchange.pancakeswap.finance',
  },
  {
    label: 'Farming Pools',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Time Pools',
    icon: 'PoolIcon',
    href: '/timepools',
  },
  {
    label: 'Staking Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Money Printer',
    icon: 'TicketIcon',
    href: '/moneypools',
  },
  {
    label: 'Docs',
    icon: 'NftIcon',
    href: '/collectibles',
  },
]

export default config
