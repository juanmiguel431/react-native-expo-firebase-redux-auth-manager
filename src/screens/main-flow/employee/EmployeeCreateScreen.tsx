import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import { EmployeeCreateScreenProps } from '../../../models/screen';
import { StyleSheet, View } from 'react-native';
import { getDatabase, ref, update, child, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { EmployeeCreate } from '../../../models/employee';
import EmployeeForm from '../../../components/EmployeeForm';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../../../reducers';
import { useFocusEffect } from '@react-navigation/native';
import { reset } from '../../../actions/employeeFormActions';

type Props = EmployeeCreateScreenProps & StateProps & DispatchProps;

const EmployeeCreateScreen: React.FC<Props> = ({ navigation, name, phone, shift, reset }) => {

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset]));

  const onCreate = useCallback(async ({ name, phone, shift }: EmployeeCreate) => {
    const { currentUser } = getAuth();
    if (!currentUser) return;
    const db = getDatabase();
    const refDb = ref(db);
    const path = `/users/${currentUser.uid}/employees`;

    const key = push(child(refDb, path)).key;

    const updates = {
      [`${path}/${key}`]: { name, phone, shift }
    };

    //https://firebase.google.com/docs/database/web/read-and-write
    // To simultaneously write to specific children of a node without overwriting other child nodes, use the update() method.
    await update(refDb, updates);

    // to save data to a specified reference, replacing any existing data at that path.
    // await set(ref(db, `/users/${currentUser.uid}/employees`), { name, phone, shift });

    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <EmployeeForm />
      <Button
        title="Create"
        onPress={async () => {
          onCreate({ name, phone, shift });
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
  reset: typeof reset;
}

export default connect<StateProps, DispatchProps, EmployeeCreateScreenProps, RootState>(mapStateToPros, {
  reset
})(EmployeeCreateScreen);
