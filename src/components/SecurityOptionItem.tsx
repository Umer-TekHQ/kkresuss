import React from 'react'
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Pressable } from 'react-native'
import { Images } from '../assets'
import { AppNavigatorParamList } from '../navigators/routeNames'
import CustomSwitch from './CustomSwitch'


interface Props {
  item: any
  isActive: boolean
  onToggleTick: () => void
  biometricsEnabled: boolean
  setBiometricsEnabled: (val: boolean) => void
  onNavigate?: (route: keyof AppNavigatorParamList) => void 
   totalItems: number
     index: number
}

const SecurityOptionItem = ({
  item,
  isActive,
  onToggleTick,
  biometricsEnabled,
  setBiometricsEnabled,
  onNavigate,
totalItems,
index

}: Props) => {

 const handleRowPress = () => {
    if (item.route) {
      onNavigate?.(item.route)
    }
  }


  return (
    <View>
      
      <TouchableOpacity style={styles.optionRow} onPress={handleRowPress} >
       
        <Pressable 
        //onPress={onToggleTick}
        
         style={styles.leftCheck}>
          <View style={styles.checkCircle}>
            <Image
              source={Images.tick}
              style={[styles.tickImage, isActive && { tintColor: '#CEB55A' }]}
            />
          </View>
        </Pressable>
        

     
        <Text style={styles.optionTitle}>{item.title}</Text>

      
        {item.pro && <Image source={Images.pro} style={styles.proBadge} />}

        
        {item.toggle ? (
  // <Switch   (QA requirements changes )
  //   value={biometricsEnabled}
  //   onValueChange={setBiometricsEnabled}
  //   thumbColor="#FFFFFF"
  //   trackColor={{ true: '#3D6AFF', false: '#030A74' }}
  //    style={{
  //   transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  //   marginRight: 4,
    
  // }}
  // />
   <CustomSwitch
    value={biometricsEnabled}
    onValueChange={setBiometricsEnabled}
  />
) : item.route ? (
  <TouchableOpacity onPress={() => onNavigate?.(item.route)}>
    <Image source={Images.forward} style={styles.forwardIcon} />
  </TouchableOpacity>
) :
 (<TouchableOpacity> 
  <Image source={Images.forward} style={styles.forwardIcon} />
 </TouchableOpacity>

)}

      </TouchableOpacity>

  
  {index !== totalItems - 1 &&(
  <View style={[styles.divider,
  { marginLeft: styles.checkCircle.width + styles.leftCheck.marginRight }
]} />
)}
    </View>
  )
}

export default SecurityOptionItem

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  leftCheck: {
    marginRight: 12,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#01021D',
    borderWidth: 1,
    borderColor: '#10178A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#10178A', // Default blue tick
  },
  optionTitle: {
    flex: 1,
    color: 'white',
    fontSize: 15.5,
    fontWeight: '500',
  },
  forwardIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
   tintColor:'#0734A9',
  
  },
  proBadge: {
    width: 40,
    height: 21,
    resizeMode: 'contain',
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#030A74',
    marginTop: 10,
    marginBottom: 5,
    
   //  marginLeft: 34,
  },
})




