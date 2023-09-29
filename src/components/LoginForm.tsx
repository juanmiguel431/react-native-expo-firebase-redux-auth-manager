import React from 'react';
import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
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
  error: string;
  isLoading: boolean;
};

type DispatchProps = {
  emailChange: typeof emailChange;
  passwordChange: typeof passwordChange;
};

type Props = LoginFormProps & StateProps & DispatchProps;

const _LoginForm: React.FC<Props> = (
  { emailChange, passwordChange, onSubmit, submitLabel, email, password, error, isLoading }) => {

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
      {error &&
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      }
      <Button
        title={submitLabel}
        loading={isLoading}
        onPress={() => {
          LayoutAnimation.spring();
          onSubmit({ email, password });
        }}
      />
      {/*{isLoading && <ActivityIndicator size="large"/>}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
    marginBottom: 20,
  }
})

const mapStateToProps: MapStateToProps<StateProps, LoginFormProps, RootState> = (
  { auth: { email, password, error, isLoading } }, ownProps): StateProps => {
  return { email, password, error, isLoading };
}

export const LoginForm = connect<StateProps, DispatchProps, LoginFormProps, RootState>(mapStateToProps, {
  emailChange, passwordChange
})(_LoginForm);
