import { View, Text, FlatList, Image, TouchableOpacity, Modal,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {api} from '../api';


const main = () => {

    const [data, setData] = useState<People[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedDetail, setSelectedDetail] = useState<People | null>(null);
    const [modalDetailVisible, setModalDetailVisible] = useState(false);

    type People ={
        id: string;
        name: string;
        gender: boolean;
        date: string;
        hopDong: string;
        image: string;
    }

    useEffect(() => {
        api.get('/main')
          .then((response) => {
            setData(response); 
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, []);


      const detail = (people: People) => {
        setSelectedDetail(people);
        setModalDetailVisible(true);
      }

   
  return (
    <SafeAreaView style={{flex: 1,padding: 10}}>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity style={{padding: 15,backgroundColor: '#336600',margin: 10, borderRadius: 20}} onPress={() => detail(item)}>
                    <Image style={{width: 80,height: 80,marginLeft: 150,borderRadius: 20}} source={{uri:item.image}}/>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{color: '#FFFFFF'}}>{item.name}</Text>
                        <Text style={{color: '#FFFFFF'}}>{item.gender}</Text>
                    </View>
                    <Text style={{color: '#FFFFFF'}}>{item.hopDong == "True" ? "Chính Thức" : "Thử Việc"}</Text>
                </TouchableOpacity>
            )}
        />



        <Modal visible={modalDetailVisible} transparent={true} animationType="slide">
                <View style={styles.detailContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Thông tin chi tiết</Text>
                    <Text style={styles.detailText}>ID: {selectedDetail?.id}</Text>
                    <Text style={styles.detailText}>Name: {selectedDetail?.name}</Text>
                    <Text style={styles.detailText}>Date: {selectedDetail?.date}</Text>
                    <Image source={{ uri: selectedDetail?.image }} style={styles.detailImage} />
            <TouchableOpacity style={styles.detailButton} onPress={() => setModalDetailVisible(false)}>
              <Text style={styles.detailButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      detailImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
      },
      detailText: {
        fontSize: 18,
        marginBottom: 5,
      },
      detailButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        width: 70,
        alignItems: "center",
        marginVertical: 5,
      },
      detailButtonText: {
        color: "#fff",
      },
});

export default main