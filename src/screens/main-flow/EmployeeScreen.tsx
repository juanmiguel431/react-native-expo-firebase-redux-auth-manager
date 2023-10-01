import React, { useCallback, useEffect } from 'react';
import { EmployeeScreenProps, SCREEN } from '../../models/screen';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { getEmployees, signOutUser } from '../../actions';
import { RootState } from '../../reducers';
import { Button, Text, ListItem } from '@rneui/themed';
import { User } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { Employee } from '../../models/employee';
import { useFocusEffect } from '@react-navigation/native';

type Props = EmployeeScreenProps & StateProps & DispatchProps;

const EmployeeScreen: React.FC<Props> = ({ navigation, signOutUser, getEmployees, employees, user }) => {

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

  useFocusEffect(
    useCallback(() => {
      getEmployees();
    }, [getEmployees]));

  return (
    <View>
      <Text>Employee List</Text>
      <Text>{user?.email}</Text>
      <FlatList
        data={employees}
        keyExtractor={item => item.name}
        renderItem={({ item: { name, phone, shift } }) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>{phone}</ListItem.Subtitle>
              <ListItem.Subtitle>{shift}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
      <Button onPress={signOutUser} title="Sign Out"/>
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
  employees: Employee[];
}

const mapStateToProps: MapStateToProps<StateProps, EmployeeScreenProps, RootState> = (state) => {
  return { user: state.auth.user, employees: state.employee.items };
}

type DispatchProps = {
  signOutUser: () => void;
  getEmployees: () => void;
}

export default connect<StateProps, DispatchProps, EmployeeScreenProps, RootState>(mapStateToProps, {
  signOutUser, getEmployees
})(EmployeeScreen);
