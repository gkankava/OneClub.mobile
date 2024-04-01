import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRootStore} from '../store/rootStore';
import NavigationHelper from '../helpers/NavigationHelper';
import {Stacks} from '../navigation/consts/stacks';

type Props = {};

const LoginScreen = (props: Props) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNavigation = () => {
    NavigationHelper.replace(Stacks.MAIN_STACK);
  };

  const {loading, error} = useRootStore((state: any) => state.user);
  const authLoginUser = useRootStore((state: any) => state.authLoginUser);

  const handleLogin = () => {
    authLoginUser({phone, password}, handleNavigation);
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
        onPress={handleLogin}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
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
