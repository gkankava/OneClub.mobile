import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../consts/screens';
import HomeScreen from '../../screens/HomeScreen';
import ExpenseScreen from '../../screens/ExpenseScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.HOME_SCREEN}
        component={HomeScreen}
        options={{headerTitle: 'Home'}}
      />
      <Stack.Screen name={Screens.EXPENSE_SCREEN} component={ExpenseScreen} />
    </Stack.Navigator>
  );
};
