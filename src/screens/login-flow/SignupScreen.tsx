import React, { useEffect } from 'react';
import { SignupScreenProps } from '../../models/screen';
import { LoginForm } from '../../components/LoginForm';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers';
import { signupUser, navigateToSignin } from '../../actions';
import { User } from '../../models/user';
import { HeaderBackButton } from '@react-navigation/elements';

type Props = SignupScreenProps & StateProps & DispatchProps;

const SignupScreen: React.FC<Props> = ({ signupUser, navigateToSignin, navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={navigateToSignin}/>
      ),
    });
  }, [navigation, navigateToSignin]);

  return (
    <LoginForm
      onSubmit={signupUser}
      submitLabel="Signup"
    />
  );
};

type StateProps = {};

const mapStateToProps: MapStateToProps<StateProps, SignupScreenProps, RootState> = () => {
  return {};
}

type DispatchProps = {
  signupUser: (user: User) => void;
  navigateToSignin: typeof navigateToSignin;
};

export default connect<StateProps, DispatchProps, SignupScreenProps, RootState>(mapStateToProps, {
  signupUser, navigateToSignin
})(SignupScreen);
