import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from './reducers';
import { RootStackParamList, SCREEN } from './models/screen';
import ResolveAuthScreen from './screens/ResolveAuthScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login-flow/LoginScreen';
import SignupScreen from './screens/login-flow/SignupScreen';
import EmployeeScreen from './screens/main-flow/EmployeeScreen';

type Props = StateProps;

const Stack = createStackNavigator<RootStackParamList>();

const LoginFlow: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Signin}>
      <Stack.Screen name={SCREEN.Signin} component={LoginScreen} options={{ title: 'Login' }}/>
      <Stack.Screen name={SCREEN.Signup} component={SignupScreen} options={{ title: 'Signup' }}/>
    </Stack.Navigator>
  );
};

const MainFlow: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Employee}>
      <Stack.Screen name={SCREEN.Employee} component={EmployeeScreen} options={{ title: 'Employees' }}/>
    </Stack.Navigator>
  );
};

const resolveAuth = (isSignedIn: boolean | null) => {
  switch (isSignedIn) {
    case true:
      return <Stack.Screen name={SCREEN.MainFlow} component={MainFlow} options={{ headerShown: false }}/>;
    case false:
      return <Stack.Screen name={SCREEN.LoginFlow} component={LoginFlow} options={{ headerShown: false }}/>;
    default:
      return <Stack.Screen name={SCREEN.ResolveAuth} component={ResolveAuthScreen} options={{ headerShown: false }}/>
  }
};

const AppContainer: React.FC<Props> = ({ isSignedIn }) => {
  return (
    <React.Fragment>
      <StatusBar style="auto"/>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {resolveAuth(isSignedIn)}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

type StateProps = {
  isSignedIn: boolean | null;
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(AppContainer);
