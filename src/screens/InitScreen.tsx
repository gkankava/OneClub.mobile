import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavigationHelper from '../helpers/NavigationHelper';
import {Stacks} from '../navigation/consts/stacks';
import {Screens} from '../navigation/consts/screens';
import {StorageHelper} from '../helpers/StorageHelper';

type Props = {};

const InitScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const syncStore = async () => {
    let token = await StorageHelper.get('authToken');
    setLoading(false);
    // validate token and redirect
    token && NavigationHelper.navigate(Stacks.MAIN_STACK);
  };
  useEffect(() => {
    syncStore();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Signin"
        onPress={() =>
          NavigationHelper.navigate(Stacks.AUTH_STACK, {
            screen: Screens.AUTH_LOGIN,
          })
        }
      />
      <Button
        title="Signup"
        onPress={() =>
          NavigationHelper.navigate(Stacks.AUTH_STACK, {
            screen: Screens.AUTH_REGISTER,
          })
        }
      />
    </SafeAreaView>
  );
};

export default InitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
