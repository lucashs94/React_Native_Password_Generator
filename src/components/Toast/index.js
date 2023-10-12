import React, { useEffect, useState } from 'react'
import { 
  Animated,
  Dimensions, 
  Easing, 
  Platform, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback, 
  View 
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Feather } from '@expo/vector-icons'
import useToastNotify from '../../contexts/toastContext'



const {width} = Dimensions.get('window')
var timer = null


export default function Toast(){

  const colors = {
    success: '#43D29E',
    warning: '#FD951f',
    error: '#E91E63',
    default: '#3A405B',
  }

  const [styleStatusBar, setStyleStatusBar] = useState('dark-content')

  const [pos] = useState(new Animated.Value(-(getStatusBarHeight() + 60)))

  const { notify, hideNotify } = useToastNotify()


  useEffect( () => {

    notify.show && showToast()
  
  },[notify])


  function showToast(){
    clearTimeout(timer)
    setStyleStatusBar('light-content')

    Animated.timing(pos, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear
    })
    .start()

    timer = setTimeout(() => {
      hideToast()
    }, notify.duration);
  }


  function hideToast(){
    Animated.timing(pos, {
      toValue: -(getStatusBarHeight() + 60),
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear
    })
    .start(() => {
      hideNotify()
      setStyleStatusBar('light-content')
    })
  }


  function zIndex(value){
    return Platform.select({
      ios: {zIndex: value},
      android: {elevation: value}
    })
  }


  return(
    <View style={{ ...zIndex(100) }}
    >
      <StatusBar 
        barStyle={styleStatusBar} 
        translucent={true}
        backgroundColor={'#FFF'}
      />
      
      <TouchableWithoutFeedback
        onPress={() => {
          clearTimeout(timer)
          hideToast()
        }}
      >
        <Animated.View 
          style={[
            styles.container, 
            { 
              backgroundColor: colors[notify.type] ,
              transform: [{translateY: pos}]
            }
          ]}
        >
          <View style={styles.msgContainer}>
            {notify.iconName !== '' && 
              <Feather name={notify?.iconName} color={'#FFF'} size={25}/>
            }
            <Text style={styles.msgText}>{notify?.message}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: getStatusBarHeight() + 7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  msgContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  msgText:{
    color: '#FFF',
    fontSize: 14,
    marginHorizontal: 20,
  },
})  