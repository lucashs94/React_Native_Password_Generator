
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/home'
import Passwords from '../pages/passwords'


const Stack = createNativeStackNavigator()

export default function AppRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='passwords'
        component={Passwords}
      />

    </Stack.Navigator>
  )
}