import React from 'react';
import { EmployeeScreenProps } from '../../models/screen';
import { View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { signOutUser } from '../../actions';
import { RootState } from '../../reducers';
import { Button, Text } from '@rneui/themed';
import { User } from 'firebase/auth';

type Props = EmployeeScreenProps & StateProps & DispatchProps;

const EmployeeScreen: React.FC<Props> = ({ signOutUser, user }) => {
  return (
    <View>
      <Text>Employee List</Text>
      <Text>{user?.email}</Text>
      <Button onPress={signOutUser} title="Sign Out" />
    </View>
  );
};

type StateProps = {
  user: User | null;
}

const mapStateToProps: MapStateToProps<StateProps, EmployeeScreenProps, RootState> = (state) => {
  return { user: state.auth.user };
}

type DispatchProps = {
  signOutUser: () => void;
}

export default connect<StateProps, DispatchProps, EmployeeScreenProps, RootState>(mapStateToProps, {
  signOutUser
})(EmployeeScreen);
