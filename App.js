import { Provider } from 'react-redux';
import LoginScreen from './features/auth/login/presentation/login_screen';
import store from './redux/store';
import ExampleScreen from './features/redux-example/redux_screen';

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
}
