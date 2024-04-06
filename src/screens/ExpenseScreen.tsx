import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRootStore} from '../store/rootStore';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseModal from '../components/ModalContainer';
import ExpenseForm from '../components/ExpenseForm';

const ExpenseScreen = (props: any) => {
  const {
    navigation,
    route: {
      params: {
        ref: {name, _id},
      },
    },
  } = props;
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({title: name});
    }, [name]),
  );

  const getExpenses = useRootStore((state: any) => state.getExpenses);
  const data = useRootStore((state: any) => state.expenses.data.expenses);

  useEffect(() => {
    if (_id) {
      console.log(_id);
      getExpenses(_id);
    }
  }, [_id]);

  const [modalShown, setModalShown] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {data?.map((item: any) => (
          <ExpenseItem key={item._id.toString()} {...item} />
        ))}
        <Button title="Add new expense" onPress={() => setModalShown(true)} />
      </ScrollView>
      {modalShown && (
        <ExpenseModal setIsShown={setModalShown}>
          <ExpenseForm
            isEditing={false}
            categoryId={_id}
            setModalShown={setModalShown}
          />
        </ExpenseModal>
      )}
    </View>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    height: '100%',
    flex: 1,
  },
  scrollViewContainer: {
    paddingVertical: 12,
    paddingBottom: 50,
    rowGap: 10,
  },
});
