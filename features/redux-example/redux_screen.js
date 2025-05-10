import { StyleSheet, Button, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  changeName,
  doubleIncrement,
  doubleDecrement,
} from '../../redux/counter_slice';

const ExampleScreen = () => {
  const count = useSelector((state) => state.count);
  const name = useSelector((state) => state.name);

  const dispatch = useDispatch();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Count: {count}</Text>
        <Text style={styles.text}> {name}</Text>

        <Button title='Increment' onPress={() => dispatch(increment())} />
        <Button title='Decrement' onPress={() => dispatch(decrement())} />
        <Button
          title='Double Increment'
          onPress={() => dispatch(doubleIncrement())}
        />
        <Button
          title='Double Decrement'
          onPress={() => dispatch(doubleDecrement())}
        />
        <Button
          title='Change Name'
          onPress={() => dispatch(changeName('Shahzeel'))}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ExampleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
