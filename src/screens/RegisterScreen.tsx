import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRootStore} from '../store/rootStore';
import NavigationHelper from '../helpers/NavigationHelper';
import {Stacks} from '../navigation/consts/stacks';

type Props = {};

const RegisterScreen = (props: Props) => {
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {loading, error} = useRootStore((state: any) => state.user);
  const authRegisterUser = useRootStore((state: any) => state.authRegisterUser);

  const handleNavigation = () => {
    NavigationHelper.replace(Stacks.MAIN_STACK);
  };

  const handleRegister = () => {
    authRegisterUser({phone, name, surname, password}, handleNavigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Phone number"
        style={styles.input}
        placeholderTextColor={'gray'}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Name"
        style={styles.input}
        placeholderTextColor={'gray'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Surname"
        style={styles.input}
        placeholderTextColor={'gray'}
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text>{error}</Text>}
      <Button
        disabled={loading}
        title={loading ? 'loading' : 'Continue'}
        onPress={handleRegister}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    rowGap: 8,
  },
  input: {
    backgroundColor: '#ddd',
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
