import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/main');
    },3000);
  });
  
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
        <Image style={{width: 300,height: 200}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCNUmgIXmb9DdD1k4GURmooIHJ0j-YSRACQ&s'}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold',margin: 20}}>Hoàng Tiến Đạt</Text>
        <Text>PH53550</Text>
    </SafeAreaView>
  );
}
