import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import {api} from '../api'


const main = () => {

    type Student = {
        id: string;
        name: string;
        gender: string;
        date: string;
        hopDong: boolean;
        image: string;
    }

    const [data, setData] = useState<Student[]> ([]);
    const [modalDetail, setModalDetail] = useState(false);
    const [selectModalDetail,setSelectModalDetail] = useState<Student | null> (null);

    useEffect(() => {
        api.get('/main')
          .then((response) => {
            setData(response); 
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      const showDetail = (student : Student) => {
        setSelectModalDetail(student);
        setModalDetail(true);
      }





  return (
    <SafeAreaView style={{flex: 1}}>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity style={{padding: 15,backgroundColor: '#336600',margin: 10, borderRadius: 20}} onPress={() => showDetail(item)}>
                    <Image style={{width: 80,height: 80,marginLeft: 150,borderRadius: 20}} source={{uri:item.image}}/>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{color: '#FFFFFF'}}>{item.name}</Text>
                        <Text style={{color: '#FFFFFF'}}>{item.gender}</Text>
                    </View>
                    <Text style={{color: '#FFFFFF'}}>{String(item.hopDong) == "True" ? "Chính Thức" : "Thử Việc"}</Text>
                </TouchableOpacity>
            )}
            />


            <Modal visible={modalDetail} transparent={true} animationType="slide">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                    <View style={{padding: 20, width: '80%', borderRadius: 20, alignItems: 'center',flexDirection:'column',backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
                        <Image style={{width: 100, height: 100}} source={{uri: selectModalDetail?.image}}/>
                        <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white',fontSize: 20}}>{selectModalDetail?.name}</Text>
                        <Text style={{color: 'white',fontSize: 20}}>{selectModalDetail?.gender}</Text>
                        </View>
                        <Text style={{color: 'white',fontSize: 20}}>{String(selectModalDetail?.hopDong) == "True" ? "Chính Thức" : "Thử Việc"}</Text>
                            <TouchableOpacity >
                                 <Button title='Đóng' onPress={() => setModalDetail(false)}/>
                            </TouchableOpacity>
                    </View>
                </View>
            </Modal>



    </SafeAreaView>


  )
}

export default main