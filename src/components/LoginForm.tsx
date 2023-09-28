import React from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { emailChange, passwordChange, loginUser } from '../actions';
import { User } from '../models/user';

type LoginFormProps = {};

type StateProps = {
  email: string;
  password: string;
};

type DispatchProps = {
  emailChange: typeof emailChange;
  passwordChange: typeof passwordChange;
  loginUser: (user: User) => void;
};

type Props = LoginFormProps & StateProps & DispatchProps;

const _LoginForm: React.FC<Props> = ({ emailChange, passwordChange, loginUser, email, password  }) => {

  return (
    <View>
      <Text h1>Login Form</Text>
      <Input
        label="Email"
        placeholder="email@domain.com"
        textContentType="emailAddress"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={emailChange}
      />
      <Input
        label="Password"
        placeholder="password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={passwordChange}
      />
      <Button
        title="Login"
        onPress={() => {
          loginUser({ email, password });
        }}
      />
    </View>
  );
};

const mapStateToProps: MapStateToProps<StateProps, LoginFormProps, RootState> = ({ auth: { email, password} }, ownProps) => {
  return { email, password };
}

export const LoginForm = connect<StateProps, DispatchProps, LoginFormProps, RootState>(mapStateToProps, {
  emailChange, passwordChange, loginUser
})(_LoginForm);