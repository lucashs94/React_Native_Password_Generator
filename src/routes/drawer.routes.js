import { createDrawerNavigator } from '@react-navigation/drawer';
import AppRoutes from './app.routes';


const Drawer = createDrawerNavigator();


export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      <Drawer.Screen name="Home" component={AppRoutes} />
      
    </Drawer.Navigator>
  );
}