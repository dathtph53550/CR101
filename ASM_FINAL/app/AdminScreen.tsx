import { View, Text, SafeAreaView,StyleSheet, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { NavigationProp, useFocusEffect } from '@react-navigation/native';


const AdminScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
    const [dataTypesCoffee, setDataTypesCoffee] = useState([]);
    interface Coffee {
        id: string;
        name: string;
        description: string;
        price: string;
        image: string;
        star: string;
        ingredient: string;
        favorites: boolean;
        types: number;
        category: string;
    }

    const [dataCoffee, setDataCoffee] = useState<Coffee[]>([]);
    const [modalVisible, setModalVisible] = useState(false);


    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState<any>(null);

    const [newCoffee, setNewCoffee] = useState({
         name: '',
         description: '',
         price: '', 
         image: '' ,
         star: '',
         ingredient: 'Milk',
         favorites: false,
         types: 1,
         category: 'Coffee'
        });

    const pressToSetting = () => {
     navigation.navigate('Login');
    };

    const navigateToDetail = (item: any) => {
        navigation.navigate('DetailScreen', {coffeeData: item});
        console.log(item);
    };

    const openEditModal = (coffee: any) => {
        setSelectedCoffee(coffee);
        setEditModalVisible(true);
    };

    const updateCoffeeOnServer = async () => {
        if (!selectedCoffee) return;
    
        try {
            const response = await fetch(`http://localhost:3000/all/${selectedCoffee.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedCoffee),
            });
    
            if (response.ok) {
                const updatedCoffee = await response.json();
                
                // Cập nhật lại danh sách
                setDataCoffee((prevData) =>
                    prevData.map((item) => (item.id === updatedCoffee.id ? updatedCoffee : item))
                );
    
                setEditModalVisible(false);
            } else {
                console.error('Lỗi khi cập nhật coffee:', response.status);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API cập nhật:', error);
        }
    };
    
    

    const fetchDataCoffee = async (coffeeType: string) => {
        try {
          const baseUrl = 'http://localhost:3000';
          const detailUrl =
            coffeeType === 'all'
              ? `${baseUrl}/${coffeeType}`
              : `${baseUrl}/all/?types=${coffeeType}`;
          const response = await fetch(detailUrl);
          const json = await response.json();
          setDataCoffee(json);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
     useFocusEffect(
        useCallback(() => {
        fetchDataCoffee('all');
        }, [])
    );
    const deleteCoffeeItem = async (id: number) => {
        Alert.alert(
            "Xác nhận xoá",
            "Bạn có chắc muốn xoá món này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xoá",
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://localhost:3000/all/${id}`, {
                                method: 'DELETE',
                            });
    
                            if (response.ok) {
                                setDataCoffee(prevData => prevData.filter(item => item.id !== id));
                            } else {
                                console.error('Lỗi khi xoá coffee:', response.status);
                            }
                        } catch (error) {
                            console.error('Lỗi khi gọi API xóa:', error);
                        }
                    },
                    style: "destructive",
                }
            ]
        );
    };

    const addCoffeeToServer = async () => {
        try {
            const response = await fetch('http://localhost:3000/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCoffee),
            });
    
            if (response.ok) {
                const createdCoffee = await response.json();
                setDataCoffee([...dataCoffee, createdCoffee]);
                setModalVisible(false);
                setNewCoffee({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    star: '',
                    ingredient: 'Milk',
                    favorites: false,
                    types: 1,
                    category: 'Coffee'
                });
            } else {
                console.error('Failed to add coffee:', response.status);
            }
        } catch (error) {
            console.error('Error adding coffee:', error);
        }
    };
    

    const renderCoffeeItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigateToDetail(item)} style={styles.coffeeItemContainer}
        onLongPress={() => deleteCoffeeItem(item.id)}>
          <Image style={styles.coffeeItemImage} source={{ uri: item.image }} />
      
          <View style={{ flex: 1, marginLeft: 19 }}>
            <Text style={styles.coffeeItemName}>{item.name}</Text>
            <Text style={styles.coffeeItemDescription} numberOfLines={2}>
              {item.description}
            </Text>
      
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ color: '#D17842', fontSize: 16, fontWeight: 'bold' }}>${item.price}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={{width: 10, height: 10}}
                    tintColor="#D17842"
                    source={require('../assets/images/star.png')}
                />
                <Text
                    style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Regular',
                    color: 'white',
                    marginStart: 5,
                    fontSize: 10,
                    }}>
                    {item.star}
                </Text>
            </View>
            
            <View
                style={{
                position: 'absolute',
                top: -10,
                right: 60,
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#21262E',
                borderRadius: 10,
                marginRight: 20,
                }}>
                <Text style={{color: '#FFFFFF'}}>{item.category}</Text>
                    
            </View>
            <View
                style={{
                position: 'absolute',
                top: -10,
                right: 0,
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#21262E',
                borderRadius: 10,
                marginRight: 20,
                }}>
                <Text style={{color: '#FFFFFF'}}>{item.ingredient}</Text>
            </View>
            <View
                style={{
                position: 'absolute',
                top: 50,
                right: 28,
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                    <Image style={{ width: 25, height: 25 }} source={require('../assets/images/sua.png')} />
                </TouchableOpacity>
            </View>
            
          </View>
        </TouchableOpacity>
      );
      

    

  return (
    <SafeAreaView style={{backgroundColor: '#0C0F14',flex: 1}} >
        <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={pressToSetting}>
            <Image
            source={require('../assets/images/back.png')}></Image>
        </TouchableOpacity>
        </View>

        <FlatList
            data={dataCoffee}
            renderItem={renderCoffeeItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false} // Hiển thị theo chiều dọc
            showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
            contentContainerStyle={{ paddingBottom: 20 }} // Tạo khoảng cách phía dưới
            style={{ marginTop: 15, paddingHorizontal: 20 }} // Căn giữa danh sách
        />

<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal nhập dữ liệu */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Coffee</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên Coffee"
              placeholderTextColor="gray"
              onChangeText={(text) => setNewCoffee({ ...newCoffee, name: text })}
              value={newCoffee.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={(text) => setNewCoffee({ ...newCoffee, description: text })}
              value={newCoffee.description}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={(text) => setNewCoffee({ ...newCoffee, price: text })}
              value={newCoffee.price}
            />
            <TextInput
              style={styles.input}
              placeholder="URL Hình ảnh"
              placeholderTextColor="gray"
              onChangeText={(text) => setNewCoffee({ ...newCoffee, image: text })}
              value={newCoffee.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Star"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={(text) => setNewCoffee({ ...newCoffee, star: text })}
              value={newCoffee.star}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'white' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#D17842' }]} onPress={addCoffeeToServer}>
                <Text style={{ color: 'white' }}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={editModalVisible}>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa Coffee</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên Coffee"
                placeholderTextColor="gray"
                value={selectedCoffee?.name}
                onChangeText={(text) => setSelectedCoffee({ ...selectedCoffee, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Mô tả"
                placeholderTextColor="gray"
                value={selectedCoffee?.description}
                onChangeText={(text) => setSelectedCoffee({ ...selectedCoffee, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Giá"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={selectedCoffee?.price}
                onChangeText={(text) => setSelectedCoffee({ ...selectedCoffee, price: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="URL Hình ảnh"
                placeholderTextColor="gray"
                value={selectedCoffee?.image}
                onChangeText={(text) => setSelectedCoffee({ ...selectedCoffee, image: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Số sao"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={selectedCoffee?.star}
                onChangeText={(text) => setSelectedCoffee({ ...selectedCoffee, star: text })}
            />

            <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setEditModalVisible(false)}>
                    <Text style={{ color: 'white' }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#D17842' }]} onPress={updateCoffeeOnServer}>
                    <Text style={{ color: 'white' }}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>



    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
      },
      button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21262E',
        borderRadius: 10,
        borderWidth: 1,
      },
      profileImage: {
        width: 30,
        height: 30,
        borderRadius: 8,
      },
      titleContainer: {
        width: 195,
        height: 72,
        marginStart: 30,
        marginTop: 30,
      },
      coffeeItemContainer: {
        width: '100%', // Chiếm toàn bộ chiều rộng
        height: 120, // Giảm chiều cao để dễ nhìn hơn
        flexDirection: 'row', // Hiển thị hình ảnh và thông tin cùng hàng
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#1C1F26', // Màu nền tối hơn
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        marginBottom: 15, // Tạo khoảng cách giữa các item
      },
      coffeeItemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
      },
      coffeeItemName: {
        width: 92,
        height: 23,
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        fontFamily: 'Poppins-Regular',
      },
      coffeeItemDescription: {
        width: 130,
        height: 20,
        color: 'white',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 20,
        fontFamily: 'Poppins-Regular',
      },
      coffeeItemPrice: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        width: 53,
        height: 25,
      },
      addToCartButton: {
        backgroundColor: '#D17842',
        borderRadius: 7,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
      },
      addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D17842',
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: '#1C1F26',
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#21262E',
      },
});

export default AdminScreen