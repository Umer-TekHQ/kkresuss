import { AppNavigatorParamList } from '../navigators/routeNames'

export interface SecurityOption {
  title: string
  pro?: boolean
  toggle?: boolean
  route?: keyof AppNavigatorParamList 
}

export const securityOptions: SecurityOption[] = [
  {
    title: 'Email',
   // route: 'Home', 
  },
  {
    title: 'Recovery Phone',
    route: 'Recovery',
  },
  {
    title: 'Advanced Verification',
    route: 'Recovery',
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
