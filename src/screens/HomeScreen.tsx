import {
  ActivityIndicator,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRootStore} from '../store/rootStore';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import NavigationHelper from '../helpers/NavigationHelper';
import {Screens} from '../navigation/consts/screens';

type Props = {};

const HomeScreen = (props: Props) => {
  const getExpensesCategories = useRootStore(
    (state: any) => state.getExpensesCategories,
  );
  const addNewCategory = useRootStore((state: any) => state.addNewCategory);
  const {loading, data} = useRootStore((state: any) => state.expenses);

  useEffect(() => {
    getExpensesCategories();
  }, []);

  const [inputShown, setInputShown] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const handleNewCategory = () => {
    addNewCategory({categoryName}, () => {
      setInputShown(false);
      setCategoryName('');
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {inputShown && (
        <View style={{marginTop: 10}}>
          <Text>New category</Text>
          <TextInput
            placeholder="Category name"
            style={styles.input}
            placeholderTextColor={'gray'}
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <Button
            disabled={loading}
            title={loading ? 'loading' : 'Add'}
            onPress={handleNewCategory}
          />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.grid}>
        {data.map((item: {_id: string; name: string}, key: number) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              NavigationHelper.navigate(Screens.EXPENSE_SCREEN, {ref: item});
            }}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            setInputShown(state => !state);
          }}
          style={[
            styles.categoryButton,
            {
              borderStyle: 'dashed',
              borderWidth: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
          ]}>
          <Text>Add category +</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  grid: {
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
  },
  categoryButton: {
    width: (Dimensions.get('window').width - 58) / 2,
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#ddd',
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 8,
  },
});
