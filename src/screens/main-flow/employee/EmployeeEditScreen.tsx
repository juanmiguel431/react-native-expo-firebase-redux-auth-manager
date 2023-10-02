import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import { EmployeeEditScreenProps } from '../../../models/screen';
import { StyleSheet, View } from 'react-native';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Employee } from '../../../models/employee';
import EmployeeForm from '../../../components/EmployeeForm';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../../reducers';
import { useFocusEffect } from '@react-navigation/native';
import { employeeFormReset, employeeFormSet } from '../../../actions/employeeFormActions';
import { getEmployee } from '../../../actions';
import { EmployeeFormState } from '../../../reducers/employeeFormReducer';

type Props = EmployeeEditScreenProps & StateProps & DispatchProps;

const EmployeeEditScreen: React.FC<Props> = (
  { navigation, route, employee, getEmployee, employeeFormSet, reset, form
  }) => {
  const employeeId = route.params.employeeId;
  useFocusEffect(
    useCallback(() => {
      reset();
      getEmployee(employeeId).then((result) => {
        employeeFormSet({ name: result?.name || '', phone: result?.phone || '', shift: result?.shift || '' });
      });
    }, [reset, getEmployee, employeeId, employeeFormSet]));

  const onSave = useCallback(async (employeeId: string, employee: EmployeeFormState) => {
    const { currentUser } = getAuth();
    if (!currentUser) return;
    const db = getDatabase();
    const refDb = ref(db);
    const path = `/users/${currentUser.uid}/employees`;

    const updates = {
      [`${path}/${employeeId}`]: employee
    };

    await update(refDb, updates);

    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <EmployeeForm/>
      <Button
        title="Save"
        onPress={() => {
          onSave(employeeId, form);
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({});

type StateProps = {
  employee: Employee;
  form: EmployeeFormState
};

const mapStateToPros: MapStateToProps<StateProps, EmployeeEditScreenProps, RootState> = (state, { route }) => {
  const { employeeId } = route.params;
  return {
    employee: state.employee.items[employeeId],
    form: state.employeeForm
  };
};

type DispatchProps = {
  reset: typeof employeeFormReset;
  employeeFormSet: typeof employeeFormSet;
  getEmployee: (id: string) => Promise<Employee | undefined>;
}

export default connect<StateProps, DispatchProps, EmployeeEditScreenProps, RootState>(mapStateToPros, {
  reset: employeeFormReset, getEmployee, employeeFormSet
})(EmployeeEditScreen);
