import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import SecScreen from './screens/sec';

export default function App() {
  return (
    <AuthProvider>
      <LoginScreen></LoginScreen>
    </AuthProvider>
  );
}

