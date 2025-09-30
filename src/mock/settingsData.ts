
import { Images } from '../assets'
import { AppNavigatorParamList } from '../navigators/routeNames'; 

export interface SettingItem {
  title: string
  subtitle: string
  icon: any,
  route?: keyof AppNavigatorParamList 
}

export const settingsData:SettingItem[] = [
  {
    title: 'Security',
    subtitle: 'Email and phone, recovery, biometrics, insurance',
    icon: Images.secure1,
    route:'Security'
  },
  {
    title: 'Identity',
    subtitle: 'Profile picture, username, Kresus ID',
    icon: Images.identity,
     route:'ProfileScreen'
  },
   {
    title: 'Connections',
    subtitle: 'Connect to Coinbase, connected apps, WalletConnect',
    icon: Images.connections,
  },
    {
    title: 'Referrals and Rewards',
    subtitle: 'Get your unique referral code',
    icon: Images.referrals,
  },
   {
    title: 'Notifications',
    subtitle: 'Alerts and updates',
    icon: Images.notifications,
  },
   {
    title: 'Contacts',
    subtitle: 'Manage and sync device contacts',
    icon: Images.contacts,
  },
  {
    title: 'Help and Support',
    subtitle: 'Contact, legal, app info',
    icon: Images.questionMark,
  },
]
