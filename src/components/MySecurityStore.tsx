import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Images } from '../assets'
import { Colors } from '../theme/colors'

const MySecurityScore = ({ score }: { score: number }) => {
  return (
    <View style={styles.container}>
      
   <View style={styles.iconWrapper}>
        <Image source={Images.headImage} style={styles.icon} />
        <View style={styles.titleRow}>
        <Text style={styles.title}>My Security Score</Text>
        <Text style={styles.scoreText}>{score}/5</Text>
        </View>
   </View>

   
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4, 5].map((val) =>
              val <= score ? (
                <LinearGradient
                  key={val}
                  colors={[Colors.fieldBorder, Colors.gold]} 
                   start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  style={styles.progressFilled}
                />
              ) : (
                <View key={val} style={styles.progressEmpty} />
              )
            )}
          </View>
        </View>
    </View>


  )
}

export default MySecurityScore
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', 
    paddingVertical: 25,      
    paddingHorizontal: 15,
    backgroundColor: Colors.background4,
    borderRadius: 14,
    marginHorizontal: 16, 
    marginBottom: 10,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 2,
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 24,
    resizeMode:"contain",
    top:-10,
    marginRight:8,
  },
  middleSection: {
    flex: 1,
    marginTop: -4,
     
  },
  title: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  scoreText: {
    color: Colors.gold,
    fontSize: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  progressBarWrapper: {
    marginTop: 8,
     width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  progressFilled: {
    flex: 3,
    height: 4,
    borderRadius: 2,
  
  },
  progressEmpty: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.background,
    borderRadius: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-start', 
    marginTop: -8, 
  },
})
