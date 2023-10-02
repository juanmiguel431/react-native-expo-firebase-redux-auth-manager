import React from 'react';
import { Button, Input, Text } from '@rneui/themed';
import { Platform, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { changeProperty } from '../actions/employeeFormActions';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';

const Option = Picker.Item;

type Props = StateProps & DispatchProps;

type PickerStyle = {
  container?: any;
  label?: any;
  picker?: any;
}

const EmployeeForm: React.FC<Props> = ({ name, phone, shift, changeProperty }) => {

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
        onChangeText={(text) => changeProperty('name', text)}
      />
      <Input
        label="Phone"
        placeholder="555-555-5555"
        keyboardType="numeric"
        textContentType="telephoneNumber"
        value={phone}
        onChangeText={(text) => changeProperty('phone', text)}
      />
      <View style={[styles.pickerContainer, pickerStyle.container]}>
        <Text style={[styles.pickerLabel, pickerStyle.label]}>Shift</Text>
        <Picker
          style={[styles.picker, pickerStyle.picker]}
          selectedValue={shift}
          onValueChange={(value) => changeProperty('shift', value)}
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
});

type StateProps = {
  name: string;
  phone: string;
  shift: string;
};

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = ( { employeeForm }) => {
  return { ...employeeForm };
};

type DispatchProps = {
  changeProperty: typeof changeProperty;
};

export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, {
  changeProperty
})(EmployeeForm);
