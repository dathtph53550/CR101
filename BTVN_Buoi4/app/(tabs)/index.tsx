import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.text, styles.yellowText]}>
        Em vào đời bằng <Text style={styles.redText}>vang đỏ</Text> anh vào đời bằng <Text style={styles.blueText}>nước trà</Text>
      </Text>
      <Text style={styles.text}>
        Bằng cơn mưa thơm <Text style={styles.boldText}>mùi đất</Text> và <Text style={styles.text}>bằng hoa dại mọc trước nhà</Text>
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.italicText,styles.greyText]}>Em vào đời bằng kế hoạch anh vào đời bằng mộng mơ</Text>
      </Text>
      <Text style={styles.text}>
        Lý trí em là <Text style={styles.underlineText}>c ô n g c ụ</Text>
        {'\n'}còn trái tim anh là <Text style={styles.underlineText}>đ ộ n g c ơ</Text>
      </Text>
      <Text style={[styles.text, styles.line20]}>
        Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình
      </Text>
      <Text style={[styles.text, styles.orangeTextContainer]}>
        <Text style={styles.orangeText}>
          Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={[styles.text,styles.blackText]}>Em vào đời bằng</Text> mây trắng <Text style={[styles.text,styles.blackText]}>em vào đời bằng</Text> <Text style={styles.yellowText}>nắng xanh</Text>
      </Text>
      <Text style={styles.text}>
         <Text style={[styles.text,styles.blackText]}>Em vào đời bằng </Text>
         <Text style={styles.yellowText}>đại lộ</Text>
         <Text style={[styles.text,styles.blackText]}> và con đường đó giờ </Text>
        vắng anh
      </Text>
    </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0000FF', // Nền xanh
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    color: '#FFFFFF', // Chữ trắng
    fontSize: 18,
    marginBottom: 10,
  },
  redText: {
    color: '#FF0000',
  },
  blackText:{
    color: '#000000',
    fontWeight: 'bold'
  },
  blueText: {
    color: '#00FFFF',
  },
  yellowText: {
    color: '#FFFF00',
    fontWeight: 'bold',
    fontSize:22
  },
  greyText:{
    color: '#D3D3D3',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize:25
  },
  orangeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center', 
  },
  orangeText: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center', // Căn giữa văn bản bên trong
    marginVertical: 10,
  },
  
  line20: {
    marginLeft: 30,
    fontWeight: 'thin'
  },
});