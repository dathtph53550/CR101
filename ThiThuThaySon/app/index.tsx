import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, SafeAreaView, Text, View ,} from "react-native";

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/main');
    },3000)
  },[]);

  return (
    <SafeAreaView style={{flex: 1,justifyContent: 'center', alignItems:'center',backgroundColor:'yellow'}}> 
      <Image style={{width: 300, height: 200}} source={{uri:'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}/>
      <Text style={{margin: 20, fontSize: 20,fontWeight: 'bold',color: 'red'}}>Hoàng Tiến Đạt</Text>
      <Text>MSV: PH53550</Text>
    </SafeAreaView>
  );
}
