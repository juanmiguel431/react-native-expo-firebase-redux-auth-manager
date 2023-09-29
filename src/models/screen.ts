import { NativeStackScreenProps, NativeStackNavigationProp  } from 'react-native-screens/native-stack';
import type { RouteProp } from '@react-navigation/native';

export const enum SCREEN {
  Signin = 'Signin',
  Signup = 'Signup',
}

export type RootStackParamList = {
  [SCREEN.Signin]: undefined;
  [SCREEN.Signup]: undefined;
};

export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signup>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps = RouteProp<RootStackParamList>;
