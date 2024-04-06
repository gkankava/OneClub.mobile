import {
  ActivityIndicator,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRootStore} from '../store/rootStore';
import NavigationHelper from '../helpers/NavigationHelper';
import {Screens} from '../navigation/consts/screens';
import {Portal} from 'react-native-portalize';
import ExpenseModal from '../components/ModalContainer';

type Props = {};

const HomeScreen = (props: Props) => {
  const getExpensesCategories = useRootStore(
    (state: any) => state.getExpensesCategories,
  );
  const addNewCategory = useRootStore((state: any) => state.addNewCategory);
  const {loading, data, error} = useRootStore((state: any) => state.expenses);

  useEffect(() => {
    getExpensesCategories();
  }, []);

  const [inputShown, setInputShown] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const handleNewCategory = () => {
    addNewCategory({name: categoryName}, () => {
      setInputShown(false);
      setCategoryName('');
    });
  };

  if (loading && data.categories.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {inputShown && (
        <ExpenseModal setIsShown={setInputShown}>
          <KeyboardAvoidingView>
            <Text>New category</Text>
            <TextInput
              placeholder="Category name"
              style={styles.input}
              placeholderTextColor={'gray'}
              value={categoryName}
              onChangeText={setCategoryName}
            />
            {error && <Text style={{color: '#D26864'}}>{error}</Text>}
            <Button
              disabled={loading || categoryName.length === 0}
              title={loading ? 'loading' : 'Add'}
              onPress={handleNewCategory}
            />
          </KeyboardAvoidingView>
        </ExpenseModal>
      )}
      <ScrollView contentContainerStyle={styles.grid}>
        {data?.categories?.map(
          (item: {_id: string; name: string}, key: number) => (
            <TouchableOpacity
              key={key.toString()}
              style={styles.categoryButton}
              onPress={() => {
                NavigationHelper.navigate(Screens.EXPENSE_SCREEN, {ref: item});
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ),
        )}
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
  modal: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    width: '95%',
    padding: 20,
    paddingVertical: 20,
    paddingBottom: 10,
    borderRadius: 10,
  },
});
