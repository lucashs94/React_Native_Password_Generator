
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../pages/home'
import Passwords from '../pages/passwords'

import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Routes(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              return <Ionicons name='home' color={color} size={size} />
            }
            return <Ionicons name='home-outline' color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name='passwords'
        component={Passwords}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if(focused){
              return <Ionicons name='lock-closed' color={color} size={size} />
            }
            return <Ionicons name='lock-closed-outline' color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}