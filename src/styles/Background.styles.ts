import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


const BackgroundStyles  = StyleSheet.create({
    WrapperView:{
    flex: 1,
    width: '100%',
    alignItems: 'center' 
  },
  gradient: {
 
   //  flex: 1,
  width: '100%',
  height: '100%', 
  },
  logo: {
    position: 'absolute',
  //  top: height * 0.06,  orignal ye hai 
  top:height * 0.12,
    alignSelf: 'center',
    width: width * 0.35, 
    height: height * 0.15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  
  },
  waves: {
    width: width,
    height: height * 0.15,
  },
  land1: {
    position: 'absolute',
    left: 0,
    bottom: height * 0.13,
    width: width * 0.5,
    height: height * 0.1,
  
  },
  land2: {
    position: 'absolute',
    right: 0,
    bottom: height * 0.13,
    width: width * 0.9,
    height: height * 0.1, 
  },
  childrenContainer: {
  
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
  transform: [{ translateY: -height * 0.05 }],
},
lostAccessContainer: {
  position: 'absolute',
  bottom: height * 0.05,  
  alignSelf: 'center',
  zIndex: 5,             
  backgroundColor: 'transparent',
  paddingVertical: 6,
  paddingHorizontal: 12,
},


lostAccessText: {
  color: 'white',
  fontSize: 15,
  opacity: 0.8,
  fontWeight:'bold'
},



})
export default BackgroundStyles