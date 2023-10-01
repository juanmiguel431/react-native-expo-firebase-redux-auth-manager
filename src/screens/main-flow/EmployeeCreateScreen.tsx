import React, { useState } from 'react';
import { Button, Input, Text } from '@rneui/themed';
import { EmployeeCreateScreenProps } from '../../models/screen';
import { Platform, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, set, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Option = Picker.Item;

type PickerStyle = {
  container?: any;
  label?: any;
  picker?: any;
}

const EmployeeCreateScreen: React.FC<EmployeeCreateScreenProps> = () => {

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
        onPress={() => {
          const { currentUser } = getAuth();
          if (!currentUser) return;
          const db = getDatabase()

          set(ref(db, `/users/${currentUser.uid}/employees`), { name, phone, shift });

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
