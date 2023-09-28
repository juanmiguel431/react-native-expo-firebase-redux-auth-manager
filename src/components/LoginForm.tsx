import React from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { emailChange, passwordChange } from '../actions';

type LoginFormProps = {};

type StateProps = {
  email: string;
  password: string;
};

type DispatchProps = {
  emailChange: typeof emailChange;
  passwordChange: typeof passwordChange;
};

type Props = LoginFormProps & StateProps & DispatchProps;

const _LoginForm: React.FC<Props> = ({ emailChange, passwordChange, email, password  }) => {
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

        }}
      />
    </View>
  );
};

const mapStateToProps: MapStateToProps<StateProps, LoginFormProps, RootState> = ({ auth: { email, password} }, ownProps) => {
  return { email, password };
}

export const LoginForm = connect<StateProps, DispatchProps, LoginFormProps, RootState>(mapStateToProps, { emailChange, passwordChange })(_LoginForm);
