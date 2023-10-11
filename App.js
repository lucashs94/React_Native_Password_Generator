import 'react-native-url-polyfill/auto'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes";
import Toast from './src/components/Toast';
import { AuthProvider } from './src/contexts/authContext';
import { ToastContextProvider } from './src/contexts/toastContext';


export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <ToastContextProvider>
          <Toast />
          <Routes />
        </ToastContextProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
