import React, { useCallback, useState } from 'react';
import { Button, Input, Text } from '@rneui/themed';
import { EmployeeCreateScreenProps } from '../../models/screen';
import { Platform, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, update, child, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { EmployeeCreate } from '../../models/employee';

const Option = Picker.Item;

type PickerStyle = {
  container?: any;
  label?: any;
  picker?: any;
}

const EmployeeCreateScreen: React.FC<EmployeeCreateScreenProps> = ({ navigation }) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('Monday');


  let pickerStyle: PickerStyle = {};
  if (Platform.OS === 'ios') {
    pickerStyle = {
      container: { flexDirection: 'row' },
      label: { alignSelf: 'center' },
      picker: { flex: 1 }
    }
  }

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
      <Input
        label="Name"
        placeholder="Juan Miguel"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Phone"
        placeholder="555-555-5555"
        keyboardType="numeric"
        textContentType="telephoneNumber"
        value={phone}
        onChangeText={setPhone}
      />
      <View style={[styles.pickerContainer, pickerStyle.container]}>
        <Text style={[styles.pickerLabel, pickerStyle.label]}>Shift</Text>
        <Picker
          style={[styles.picker, pickerStyle.picker]}
          selectedValue={shift}
          onValueChange={setShift}
        >
          <Option label="Monday" value="Monday"/>
          <Option label="Tuesday" value="Tuesday"/>
          <Option label="Wednesday" value="Wednesday"/>
          <Option label="Thursday" value="Thursday"/>
          <Option label="Friday" value="Friday"/>
          <Option label="Saturday" value="Saturday"/>
          <Option label="Sunday" value="Sunday"/>
        </Picker>
      </View>
      <Button
        title="Create"
        onPress={async () => {
          onCreate({ name, phone, shift });
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {},
  pickerContainer: {},
  pickerLabel: {
    color: 'gray',
    fontSize: 18,
    paddingLeft: 10
  },
})

export default EmployeeCreateScreen;
