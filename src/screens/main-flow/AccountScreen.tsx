import React from 'react';
import { Button, Text } from '@rneui/themed';
import { AccountScreenProps } from '../../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers';
import { User } from 'firebase/auth';
import { View } from 'react-native';
import { signOutUser } from '../../actions';

type Props = AccountScreenProps & StateProps & DispatchProps;

const AccountScreen: React.FC<Props> = ({ user, signOutUser  }) => {
  return (
    <View>
      <Text h4>{user?.email}</Text>
      <Button onPress={signOutUser} title="Sign Out"/>
    </View>
  );
};

type StateProps = {
  user: User | null;
}

const mapStateToProps: MapStateToProps<StateProps, AccountScreenProps, RootState> = (state) => {
  return { user: state.auth.user}
}

type DispatchProps = {
  signOutUser: () => void;
}

export default connect<StateProps, DispatchProps, AccountScreenProps, RootState>(mapStateToProps, {
  signOutUser
})(AccountScreen);
