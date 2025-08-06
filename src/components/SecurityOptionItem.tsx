import React from 'react'
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Pressable } from 'react-native'
import { Images } from '../assets'
import { AppNavigatorParamList } from '../navigators/routeNames'
interface Props {
  item: any
  isActive: boolean
  onToggleTick: () => void
  biometricsEnabled: boolean
  setBiometricsEnabled: (val: boolean) => void
  onNavigate?: (route: keyof AppNavigatorParamList) => void // 
}

const SecurityOptionItem = ({
  item,
  isActive,
  onToggleTick,
  biometricsEnabled,
  setBiometricsEnabled,
  onNavigate
}: Props) => {
  return (
    <View>
      <View style={styles.optionRow}>
       
        <Pressable onPress={onToggleTick} style={styles.leftCheck}>
          <View style={styles.checkCircle}>
            <Image
              source={Images.tick}
              style={[styles.tickImage, isActive && { tintColor: '#FFD600' }]}
            />
          </View>
        </Pressable>

     
        <Text style={styles.optionTitle}>{item.title}</Text>

      
        {item.pro && <Image source={Images.pro} style={styles.proBadge} />}

        
        {/* {item.toggle ? (
          <Switch
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
            thumbColor="#FFFFFF"
            trackColor={{ true: '#3D6AFF', false: '#3C4A6A' }}
          />
        ) : (
          <TouchableOpacity>
            <Image source={Images.forward} style={styles.forwardIcon} />
          </TouchableOpacity>
        )} */}

        {item.toggle ? (
  <Switch
    value={biometricsEnabled}
    onValueChange={setBiometricsEnabled}
    thumbColor="#FFFFFF"
    trackColor={{ true: '#3D6AFF', false: '#3C4A6A' }}
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

      </View>

  
      <View style={styles.divider} />
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
    backgroundColor: '#092758',
    borderWidth: 2,
    borderColor: '#407BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#407BFF', // Default blue tick
  },
  optionTitle: {
    flex: 1,
    color: 'white',
    fontSize: 15.5,
    fontWeight: '500',
  },
  forwardIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
   
  },
  proBadge: {
    width: 40,
    height: 21,
    resizeMode: 'contain',
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1B2A52',
    marginTop: 10,
    marginBottom: 5,
  },
})




