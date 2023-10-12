import { createDrawerNavigator } from '@react-navigation/drawer';
import AppRoutes from './app.routes';
import SignOut from '../pages/auth/SignOut';
import Home from '../pages/home';


const Drawer = createDrawerNavigator();


export default function DrawerRoutes() {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      <Drawer.Screen name="Home" component={AppRoutes} />
      {/* <Drawer.Screen name="Senhas" component={Home} /> */}
      <Drawer.Screen name="Logout" component={SignOut} />
      
    </Drawer.Navigator>
  );
}