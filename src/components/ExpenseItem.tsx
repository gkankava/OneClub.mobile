import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import StarIcon from './icons/StarIcon';
import ExpenseModal from './ModalContainer';
import ExpenseForm from './ExpenseForm';

type Props = {
  _id: string;
  category: string;
  company_name: string;
  date: any;
  price: number;
  rating: number;
};

const ExpenseItem = (props: Props) => {
  const {_id, category, company_name, date, price, rating} = props;
  const item = {
    _id,
    category,
    company_name,
    date,
    price,
    rating,
  };
  const [modalShown, setModalShown] = useState<boolean>(false);

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

  return (
    <View style={styles.container}>
      <View style={{width: '80%', rowGap: 4}}>
        <Text>{company_name}</Text>
        <Text>{renderDate(date)}</Text>
        <View style={styles.ratingContaiener}>
          {Array.from({length: rating}, (_, index) => (
            <StarIcon key={index.toString()} size={24} filled />
          ))}
        </View>
        <View style={styles.horizontalSeparator} />
        <Text>Total: {price}</Text>
      </View>
      <View style={styles.verticalSeparator} />
      <Button
        title="Edit"
        onPress={() => {
          setModalShown(true);
        }}
      />
      {modalShown && (
        <ExpenseModal setIsShown={setModalShown}>
          <ExpenseForm
            categoryId={category}
            setModalShown={setModalShown}
            isEditing={true}
            editingItem={item}
          />
        </ExpenseModal>
      )}
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ratingContaiener: {
    flexDirection: 'row',
    columnGap: 3,
    alignItems: 'center',
  },
  horizontalSeparator: {
    marginVertical: 10,
  },
  verticalSeparator: {
    width: 1,
    backgroundColor: '#d3d3d3',
    height: '80%',
  },
});
