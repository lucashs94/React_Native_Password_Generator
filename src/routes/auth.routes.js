import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from '../pages/auth'

const Stack = createNativeStackNavigator()


export default function AuthRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      <Stack.Screen name='authScreen' component={AuthScreen} />

    </Stack.Navigator>
  )
}