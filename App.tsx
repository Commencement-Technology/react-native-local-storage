import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import UserModel from './model/user.model';
import LocalStorage from './services/local.storage';

const App = () => {
  const localStorage = new LocalStorage();
  const [user, setUser] = useState(new UserModel());
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(false);

  async function readUser() {
    var data: UserModel = localStorage.getUser('user');
    setUser(data);
    Alert.alert(`Name:${data.name}\nAge:${data.age}`);
  }

  async function handleSaveButtonClick(data: any) {
    await localStorage.saveUser('user', data);
  }

  useEffect(() => {
    async function fetchData() {
      await readUser();
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={{height: 8}} />
      <View style={{width: '90%'}}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          keyboardType="default"
          onChangeText={(value: any) => {
            setName(value);
          }}
        />
        <View style={{height: 8}} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="number-pad"
          value={age}
          maxLength={2}
          onChangeText={(value: any) => {
            setAge(value);
          }}
        />
        <View style={{height: 8}} />
        {error && <Text style={styles.error}>Field's cannot be empty</Text>}
        <View style={{height: 8}} />
        <Button
          color={'orange'}
          onPress={() => {
            if (age.length == 0 || name.length == 0) {
              setError(true);
            } else {
              setError(false);
              var ageNumber = parseInt(age);
              var model: UserModel = {
                name: name,
                age: ageNumber,
              };
              handleSaveButtonClick(model);
            }
          }}
          title="Save"
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
  },
  error: {
    textAlign: 'left',
    color: 'red',
  },
});
