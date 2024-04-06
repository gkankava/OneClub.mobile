import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {useRootStore} from '../store/rootStore';
import DatePicker from 'react-native-date-picker';
import StarIcon from './icons/StarIcon';

type Props = {
  isEditing: boolean;
  editingItem?: any;
  categoryId: string;
  setModalShown: (val: boolean) => void;
};

const ExpenseForm = (props: Props) => {
  const {isEditing, editingItem, categoryId, setModalShown} = props;
  const categories = useRootStore(
    (state: any) => state.expenses.data.categories,
  );
  const {loading} = useRootStore((state: any) => state.expenses);
  const addNewExpense = useRootStore((state: any) => state.addNewExpense);
  const UpdateExistingExpense = useRootStore(
    (state: any) => state.UpdateExistingExpense,
  );
  const deleteExpense = useRootStore((state: any) => state.deleteExpense);
  const categoryList = useMemo(() => {
    return categories?.map((category: any) => ({
      label: category.name,
      value: category._id,
      key: category._id,
    }));
  }, [categories]);
  const [formFields, setFormFields] = useState<any>({
    category_id: typeof categoryId === 'string' ? categoryId : categoryId._id,
    company_name: isEditing ? editingItem.company_name : '',
    date: isEditing ? editingItem.date : null,
    price: isEditing ? editingItem.price.toString() : 0,
    rating: isEditing ? editingItem.rating : 0,
  });

  const handleFormValueChange = (key: string, value: any) => {
    setFormFields((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const renderDate = (date: any) => {
    if (!date) {
      return null;
    }
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleContinue = () => {
    if (isEditing) {
      UpdateExistingExpense(editingItem._id, formFields, () => {
        setModalShown(false);
      });
    } else {
      addNewExpense(
        {
          company_name: formFields.company_name,
          date: formFields.date,
          price: formFields.price,
          rating: formFields.rating,
        },
        categoryId,
        () => {
          setModalShown(false);
        },
      );
    }
  };

  const handleDelete = () => {
    deleteExpense(editingItem._id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Company name"
          placeholderTextColor={'#898989'}
          value={formFields.company_name}
          onChangeText={val => {
            handleFormValueChange('company_name', val);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Date</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setPickerActive(true)}>
          {/* <Text>{formFields.category?.date || 'Press to select date'}</Text> */}
          <Text style={{color: '#898989'}}>
            {!!formFields.date ? renderDate(formFields.date) : 'Select date'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor={'#898989'}
          value={formFields.price}
          onChangeText={val => {
            handleFormValueChange('price', parseInt(val));
          }}
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Rating</Text>
        <View style={{flexDirection: 'row', columnGap: 5}}>
          {Array.from({length: 5}, (_, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => {
                handleFormValueChange('rating', index + 1);
              }}>
              <StarIcon size={35} filled={index < formFields.rating} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button
        title={isEditing ? 'Update' : 'Add'}
        disabled={loading}
        onPress={handleContinue}
      />
      {isEditing && (
        <Button
          disabled={loading}
          color="#D26864"
          title="Delete"
          onPress={handleDelete}
        />
      )}
      {pickerActive && (
        <DatePicker
          modal
          open={pickerActive}
          date={!!formFields.date ? new Date(formFields.date) : new Date()}
          onConfirm={date => {
            setPickerActive(false);
            handleFormValueChange('date', date);
          }}
          onCancel={() => {
            setPickerActive(false);
          }}
        />
      )}
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  inputContainer: {
    rowGap: 5,
  },
  selectButton: {
    backgroundColor: '#f4f4f4',
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f4f4f4',
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
