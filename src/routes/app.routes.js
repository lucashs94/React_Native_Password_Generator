
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Passwords from '../pages/passwords'
import KnownPass from '../pages/knownPass'
import RandomPass from '../pages/randomPass'
import { themeApp } from '../themes/GlobalTheme'


const Stack = createNativeStackNavigator()

export default function AppRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name='passwords'
        component={Passwords}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='knownPasswords'
        component={KnownPass}
        options={{
          headerTitle: 'Senha Conhecida',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
          headerStyle: { 
            backgroundColor: themeApp.colors.primary,
          },
        }}
      />

      <Stack.Screen
        name='randomPasswords'
        component={RandomPass}
        options={{
          headerTitle: 'Senha Aleatória',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: themeApp.colors.primary},
        }}
      />

    </Stack.Navigator>
  )
}