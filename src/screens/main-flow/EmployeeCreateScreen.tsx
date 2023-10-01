import React from 'react';
import { Button, Input, Text } from '@rneui/themed';
import { EmployeeCreateScreenProps } from '../../models/screen';
import { Platform, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Option = Picker.Item;

type PickerStyle = {
  container?: any;
  label?: any;
  picker?: any;
}

const EmployeeCreateScreen: React.FC<EmployeeCreateScreenProps> = () => {

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
      <Input label="Name" placeholder="Juan Miguel"/>
      <Input
        label="Phone"
        placeholder="555-555-5555"
        keyboardType="numeric"
        textContentType="telephoneNumber"
      />
      <View style={[styles.pickerContainer, pickerStyle.container]}>
        <Text style={[styles.pickerLabel, pickerStyle.label]}>Shift</Text>
        <Picker placeholder="Shift" style={[styles.picker, pickerStyle.picker]}>
          <Option label="Monday" value="Monday"/>
          <Option label="Tuesday" value="Tuesday"/>
          <Option label="Wednesday" value="Wednesday"/>
          <Option label="Thursday" value="Thursday"/>
          <Option label="Friday" value="Friday"/>
          <Option label="Saturday" value="Saturday"/>
          <Option label="Sunday" value="Sunday"/>
        </Picker>
      </View>
      <Button title="Create" onPress={() => {}}/>
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
