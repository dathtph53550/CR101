import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font';

const index = () => {


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.view1}> 
            <Text style={styles.text1}>Nghệ nhân Hoàng Doãn Hòa là con trai của cụ Tổ nghề Hoàng Doãn Phụng - người có công đưa nghề mộc về thôn Yên Quán vào đầu những năm 50 của thế kỉ trước. Từ nhỏ, nghệ nhân Hoàng Doãn Hòa đã tỏ ra mình là người có tố chất, tiếp thu rất nhanh những kỹ thuật chân truyền của cha mình. Đến năm 17 tuổi, ông đã là thợ cả và được các cao niên trong làng đánh giá rất cao về tay nghề làm mộc. </Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text2}>Nghệ nhân Hoàng Doãn Hòa là con trai của cụ Tổ nghề Hoàng Doãn Phụng - người có công đưa nghề mộc về thôn Yên Quán vào đầu những năm 50 của thế kỉ trước. Từ nhỏ, nghệ nhân Hoàng Doãn Hòa đã tỏ ra mình là người có tố chất, tiếp thu rất nhanh những kỹ thuật chân truyền của cha mình. Đến năm 17 tuổi, ông đã là thợ cả và được các cao niên trong làng đánh giá rất cao về tay nghề làm mộc. </Text>

        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1:{
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#FFFF66',
    padding: 15
  },
  view2:{
    flex: 2,
    padding: 15,
    backgroundColor: '#99FFCC'
  },
  text1: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'SpaceMono',
  }
})
export default index