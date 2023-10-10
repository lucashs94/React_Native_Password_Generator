import 'react-native-url-polyfill/auto'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { AuthProvider } from './src/contexts/authContext';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
