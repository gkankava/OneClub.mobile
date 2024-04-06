import {Dimensions, Keyboard, Pressable, StyleSheet} from 'react-native';
import React, {Children, ReactNode} from 'react';
import {Portal} from 'react-native-portalize';

type Props = {
  setIsShown: (val: boolean) => void;
  children: ReactNode;
};

const ExpenseModal = (props: Props) => {
  const {setIsShown, children} = props;

  return (
    <Portal>
      <Pressable
        style={styles.modal}
        onPress={() => {
          setIsShown(false);
        }}>
        <Pressable
          style={styles.modalContentContainer}
          onPress={() => Keyboard.dismiss()}>
          {children}
        </Pressable>
      </Pressable>
    </Portal>
  );
};

export default ExpenseModal;

const styles = StyleSheet.create({
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
