import {LogBox, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigation/Navigator';
import {Host} from 'react-native-portalize';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <Host>
        <Navigator />
      </Host>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
