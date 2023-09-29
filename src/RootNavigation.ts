import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList, SCREEN } from './models/screen';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: SCREEN, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
