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
    href: 'https://thewapdev.github.io',
  },
  {
    label: 'Farming Pools',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Time Pools',
    icon: 'TimeIcon',
    href: '/timepools',
  },
  {
    label: 'Staking Pools',
    icon: 'StakeIcon',
    href: '/pools',
  },
  {
    label: 'Money Printer',
    icon: 'MoneyIcon',
    href: '/moneypools',
  },
  {
    label: 'Roadmap & Guide',
    icon: 'DocIcon',
    href: 'https://moneytime.gitbook.io/timeismoney-fi/',
  },
  {
    label: 'Certik Audit(In Progress)',
    icon: 'AuditIcon',
    href: 'https://leaderboard.certik.io/projects/moneytime',
  },
]

export default config
