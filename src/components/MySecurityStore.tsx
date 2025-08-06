import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Images } from '../assets'
import LinearGradient from 'react-native-linear-gradient'

const MySecurityScore = ({ score }: { score: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={Images.secureicon} style={styles.icon} />
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.title}>My Security Score</Text>
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4, 5].map((val) =>
              val <= score ? (
                <LinearGradient
                  key={val}
                  colors={['#F6C146', '#2B36E4']} 
                  style={styles.progressFilled}
                />
              ) : (
                <View key={val} style={styles.progressEmpty} />
              )
            )}
          </View>
        </View>
      </View>

      <Text style={styles.scoreText}>{score}/5</Text>
    </View>
  )
}

export default MySecurityScore
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start', // icon upar ayega
    paddingVertical: 30,      // height barhane ke liye
    paddingHorizontal: 15,
    backgroundColor: '#112054',
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  iconWrapper: {
    marginTop: 2,
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 28,
    resizeMode:"contain",
    top:-12,
  },
  middleSection: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    top:-6,
  },
  scoreText: {
    color: '#CEB55A',
    fontSize: 15,
    marginTop: 4,
    right:20, // ye b dekhna 
    top:-6 //ye height of text check krni 
  },
  progressBarWrapper: {
    marginTop: 8,
    width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  progressFilled: {
    flex: 3,
    height: 4,
    borderRadius: 2,
  },
  progressEmpty: {
    flex: 1,
    height: 4,
    backgroundColor: '#25345E',
    borderRadius: 2,
  },
})
