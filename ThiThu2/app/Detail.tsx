import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";


const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ Detail: { student: any } }, "Detail">>();
    const { student } = route.params;
    console.log(student);
return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 1, alignItems: "center",justifyContent: 'center', padding: 20 }}>
            <Image source={{ uri: student.thithu2_image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>{student.thithu2_name}</Text>
            <Text style={{ fontSize: 16 }}>Mã SV: {student.thithu2_ma}</Text>
            <Text style={{ fontSize: 16 }}>Điểm TB: {student.thithu2_diemTB}</Text>
            <TouchableOpacity style={{position: 'absolute', top: 15, left: 15}} onPress={() => navigation.goBack()}>
                <Image style={{width: 30,height: 30,position: 'absolute', top: 15, left: 15}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPII0ugdI7N_LVrL00hr_qBLKsub7LtGgDA&s'}}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
)
}

export default Detail