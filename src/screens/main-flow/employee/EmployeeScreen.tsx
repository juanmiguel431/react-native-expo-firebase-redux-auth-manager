import React, { useCallback, useEffect } from 'react';
import { EmployeeScreenProps, SCREEN } from '../../../models/screen';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { getEmployees } from '../../../actions';
import { RootState } from '../../../reducers';
import { ListItem } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { Employee } from '../../../models/employee';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

type Props = EmployeeScreenProps & StateProps & DispatchProps;

const EmployeeScreen: React.FC<Props> = ({ navigation, getEmployees, employees }) => {

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
  employees: Employee[];
}

const mapStateToProps: MapStateToProps<StateProps, EmployeeScreenProps, RootState> = (state) => {
  const employees: Employee[] = _.map(state.employee.items, (item: Employee, uid: string) =>({ ...item, id: uid, })) as any;
  return { employees: employees };
}

type DispatchProps = {
  getEmployees: () => void;
}

export default connect<StateProps, DispatchProps, EmployeeScreenProps, RootState>(mapStateToProps, {
  getEmployees
})(EmployeeScreen);
