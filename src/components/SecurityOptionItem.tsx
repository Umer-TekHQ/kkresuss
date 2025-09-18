import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'

import { Images } from '../assets'
import CustomSwitch from './CustomSwitch'
import { AppNavigatorParamList } from '../navigators/routeNames'

interface Props {
  item: any
  isActive: boolean
  biometricsEnabled: boolean
  setBiometricsEnabled: (val: boolean) => void
  onNavigate?: (route: keyof AppNavigatorParamList) => void
  totalItems: number
  index: number
  onToggleTick: () => void 
}

const CheckCircle = ({ isActive }: { isActive: boolean }) => (
  <View style={styles.checkCircle}>
    <Image
      source={Images.tick}
      style={[styles.tickImage, isActive && { tintColor: '#CEB55A' }]}
    />
  </View>
)

const RightAction = ({
  item,
  biometricsEnabled,
  setBiometricsEnabled,
  onNavigate,
}: {
  item: any
  biometricsEnabled: boolean
  setBiometricsEnabled: (val: boolean) => void
  onNavigate?: (route: keyof AppNavigatorParamList) => void
}) => {
  if (item.toggle) {
    return (
      <CustomSwitch value={biometricsEnabled} onValueChange={setBiometricsEnabled} />
    )
  }
  return (
    <TouchableOpacity onPress={() => item.route && onNavigate?.(item.route)}>
      <Image source={Images.forward} style={styles.forwardIcon} />
    </TouchableOpacity>
  )
}

const SecurityOptionItem = ({
  item,
  isActive,
  biometricsEnabled,
  setBiometricsEnabled,
  onNavigate,
  totalItems,
  index,
  onToggleTick
}: Props) => {
  const handleRowPress = () => {
    if (item.route) {
      onNavigate?.(item.route)
    }
  }

  return (
    <View>
      <TouchableOpacity style={styles.optionRow} onPress={handleRowPress}>
        <Pressable style={styles.leftCheck} onPress={onToggleTick}>
          <CheckCircle isActive={isActive} />
        </Pressable>

        <Text style={styles.optionTitle}>{item.title}</Text>
        {item.pro && <Image source={Images.proBadge1} style={styles.proBadge} />}
        <RightAction
          item={item}
          biometricsEnabled={biometricsEnabled}
          setBiometricsEnabled={setBiometricsEnabled}
          onNavigate={onNavigate}
        />
      </TouchableOpacity>

      {index !== totalItems - 1 && (
        <View
          style={[
            styles.divider,
            { marginLeft: styles.checkCircle.width + styles.leftCheck.marginRight },
          ]}
        />
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#01021D',
    borderWidth: 1,
    borderColor: '#10178A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:2
  },
  tickImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#10178A',
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
    tintColor: '#0734A9',
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
  },
})
