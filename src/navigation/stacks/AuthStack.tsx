import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../consts/screens';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.AUTH_LOGIN}
        component={LoginScreen}
        options={{headerTitle: 'Login'}}
      />
      <Stack.Screen
        name={Screens.AUTH_REGISTER}
        component={RegisterScreen}
        options={{headerTitle: 'Sign up'}}
      />
    </Stack.Navigator>
  );
};
