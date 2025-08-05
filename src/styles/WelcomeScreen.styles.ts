import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  logo: {
    position: 'absolute',
  top: height * 0.1,
  alignSelf: 'center',
  width: width * 0.5,
  height: height * 0.2,
  },
  content: {
   // marginTop: height *0.001, (QA changes)
  marginBottom:125,
    alignItems: 'center',
    justifyContent:'center',
    gap:8,
    paddingHorizontal: 24,
    display:"flex",
    flexWrap:"wrap",

  },
  heading: {
    
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
     lineHeight: 34,
  },
  subheading: {
    fontSize: 19,
    color: '#ADD2FD',
    marginTop: 8,
    flexWrap:"wrap",
    textAlign:"center",
    maxWidth: '85%',

  },
  caption: {
    fontSize: 16,
    color: '#ADD2FD',
    marginTop: 34,
    marginBottom: -2,
  },
  downIcon: {
 position: 'absolute',
  bottom: 20,
  left: 20,
  width: 30,
  height: 30,
  zIndex: 99,
},
  lostAccessContainer: {
    position: 'absolute',
    bottom: height * 0.028, 
    alignSelf: 'center',
    zIndex: 10,
  },
  lostAccessText: {
    color: 'white',
    fontSize: 15,
    fontWeight:'semibold'
  },
})
