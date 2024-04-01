import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const ExpenseScreen = (props: any) => {
  const {
    navigation,
    route: {
      params: {
        ref: {name},
      },
    },
  } = props;
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({title: name});
    }, [name]),
  );
  return (
    <View style={styles.container}>
      <></>
    </View>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
