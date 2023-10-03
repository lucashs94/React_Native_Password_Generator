import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignUp from '../pages/auth/SignUp'
import SignIn from '../pages/auth/SignIn'


const Stack = createNativeStackNavigator()


export default function AuthRoutes(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />

    </Stack.Navigator>
  )
}