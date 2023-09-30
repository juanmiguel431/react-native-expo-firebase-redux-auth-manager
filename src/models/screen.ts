import { NativeStackScreenProps, NativeStackNavigationProp  } from 'react-native-screens/native-stack';
import type { RouteProp } from '@react-navigation/native';

export const enum SCREEN {
  Signin = 'Signin',
  Signup = 'Signup',
  Employee = 'Employee',
  MainFlow = 'MainFlow',
  LoginFlow = 'LoginFlow',
  ResolveAuth = 'ResolveAuth',
}

export type RootStackParamList = {
  [SCREEN.Signin]: undefined;
  [SCREEN.Signup]: undefined;
  [SCREEN.Employee]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.LoginFlow]: undefined;
  [SCREEN.ResolveAuth]: undefined;
};

export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signup>;
export type EmployeeScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Employee>;

export type MainFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.MainFlow>;
export type LoginFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.LoginFlow>;
export type ResolveAuthScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.ResolveAuth>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps = RouteProp<RootStackParamList>;
