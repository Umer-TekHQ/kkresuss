import { AppNavigatorParamList } from '../navigators/routeNames'

export interface SecurityOption {
  title: string
  pro?: boolean
  toggle?: boolean
  route?: keyof AppNavigatorParamList // optional route key
}

export const securityOptions: SecurityOption[] = [
  {
    title: 'Email',
    route: 'Home', // example route
  },
  {
    title: 'Recovery Phone',
   // route: 'RecoveryPhoneScreen',
  },
  {
    title: 'Advanced Verification',
   // route: 'AdvancedVerificationScreen',
  },
  {
    title: 'Insurance Coverage',
    pro: true,
   // route: 'InsuranceScreen',
  },
  {
    title: 'Device Biometrics',
    toggle: true, // no route since it's toggle-only
  },
]
