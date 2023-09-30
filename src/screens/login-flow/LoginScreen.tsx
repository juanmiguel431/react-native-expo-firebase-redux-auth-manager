import React from 'react';
import { SigninScreenProps } from '../../models/screen';
import { LoginForm } from '../../components/LoginForm';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers';
import { loginUser, navigateToSignup } from '../../actions';
import { User } from '../../models/user';
import { Button } from '@rneui/themed';
import { View } from 'react-native';

type Props = SigninScreenProps & StateProps & DispatchProps;

const LoginScreen: React.FC<Props> = ({ loginUser, navigateToSignup }) => {
  return (
    <>
      <LoginForm
        onSubmit={loginUser}
        submitLabel="Signin"
      />
      <View style={{ marginTop: 40 }}>
        <Button
          type="outline"
          onPress={navigateToSignup}
          title="Create new account"
        />
      </View>
    </>
  );
};

type StateProps = {};

const mapStateToProps: MapStateToProps<StateProps, SigninScreenProps, RootState> = () => {
  return {};
}

type DispatchProps = {
  loginUser: (user: User) => void;
  navigateToSignup: typeof navigateToSignup;
};

export default connect<StateProps, DispatchProps, SigninScreenProps, RootState>(mapStateToProps, {
  loginUser, navigateToSignup
})(LoginScreen);
