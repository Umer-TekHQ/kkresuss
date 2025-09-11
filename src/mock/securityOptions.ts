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
  },
  {
    title: 'Device Biometrics',
    toggle: true, 
  },
]
