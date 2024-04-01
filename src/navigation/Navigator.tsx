import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationHelper from '../helpers/NavigationHelper';
import InitScreen from '../screens/InitScreen';
import {Screens} from './consts/screens';
import {Stacks} from './consts/stacks';
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={NavigationHelper.navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={Screens.INIT_SCREEN}
          options={{headerShown: false, headerTitle: 'Home'}}
          component={InitScreen}
        />
        <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={Stacks.MAIN_STACK} component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
