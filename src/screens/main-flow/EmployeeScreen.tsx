import React, { useEffect } from 'react';
import { EmployeeScreenProps, SCREEN } from '../../models/screen';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { signOutUser } from '../../actions';
import { RootState } from '../../reducers';
import { Button, Text } from '@rneui/themed';
import { User } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';

type Props = EmployeeScreenProps & StateProps & DispatchProps;

const EmployeeScreen: React.FC<Props> = ({ navigation, signOutUser, user }) => {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.EmployeeCreate);
          }}>
          <Feather name="plus" style={styles.addNew}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Employee List</Text>
      <Text>{user?.email}</Text>
      <Button onPress={signOutUser} title="Sign Out" />
    </View>
  );
};

const styles = StyleSheet.create({
  addNew: {
    fontSize: 30,
    paddingRight: 25
  }
});

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
