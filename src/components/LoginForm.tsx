import React from 'react';
import { View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { emailChange, passwordChange } from '../actions';
import { User } from '../models/user';

type LoginFormProps = {
  onSubmit: (user: User) => void;
  submitLabel: string;
};

type StateProps = {
  email: string;
  password: string;
};

type DispatchProps = {
  emailChange: typeof emailChange;
  passwordChange: typeof passwordChange;
};

type Props = LoginFormProps & StateProps & DispatchProps;

const _LoginForm: React.FC<Props> = ({ emailChange, passwordChange, onSubmit, submitLabel, email, password  }) => {

  return (
    <View>
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
        title={submitLabel}
        onPress={() => {
          onSubmit({ email, password });
        }}
      />
    </View>
  );
};

const mapStateToProps: MapStateToProps<StateProps, LoginFormProps, RootState> = ({ auth: { email, password} }, ownProps) => {
  return { email, password };
}

export const LoginForm = connect<StateProps, DispatchProps, LoginFormProps, RootState>(mapStateToProps, {
  emailChange, passwordChange
})(_LoginForm);
