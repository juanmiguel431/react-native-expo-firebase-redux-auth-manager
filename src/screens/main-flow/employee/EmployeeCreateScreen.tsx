import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import { EmployeeCreateScreenProps } from '../../../models/screen';
import { StyleSheet, View } from 'react-native';
import { EmployeeCreate } from '../../../models/employee';
import EmployeeForm from '../../../components/EmployeeForm';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../../reducers';
import { useFocusEffect } from '@react-navigation/native';
import { employeeFormReset } from '../../../actions/employeeFormActions';
import { createEmployee } from '../../../actions';

type Props = EmployeeCreateScreenProps & StateProps & DispatchProps;

const EmployeeCreateScreen: React.FC<Props> = ({ navigation, name, phone, shift, reset, createEmployee }) => {

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset]));

  return (
    <View>
      <EmployeeForm />
      <Button
        title="Create"
        onPress={async () => {
          await createEmployee({ name, phone, shift });
          navigation.goBack();
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({});

type StateProps = {
  name: string;
  phone: string;
  shift: string;
};

const mapStateToPros: MapStateToProps<StateProps, EmployeeCreateScreenProps, RootState> = ({ employeeForm}) => {
  return { ...employeeForm };
};

type DispatchProps = {
  reset: typeof employeeFormReset;
  createEmployee: (employee: EmployeeCreate) => Promise<void>
}

export default connect<StateProps, DispatchProps, EmployeeCreateScreenProps, RootState>(mapStateToPros, {
  reset: employeeFormReset,
  createEmployee
})(EmployeeCreateScreen);
