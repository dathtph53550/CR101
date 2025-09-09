import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface BillItem {
  id: string;
  completionTime: string;
  totalAmount: number;
  dataCartItems: CartItem[];
}

interface CartItem {
  coffeeData: {
    image: string;
    name: string;
    category: string;
    price: string;
  };
  selectedSize: string;
  quantity: string;
}

const OrderScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [billData, setBillData] = useState<BillItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/billOrders')
      .then((response) => response.json())
      .then((data) => setBillData(data))
      .catch((error) => console.error('Error fetching bill data:', error));
  }, []);

  const pressToSetting = () => {
    navigation.navigate('SettingScreen');
  };

 


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const renderItem = ({ item }: { item: BillItem }) => (
    <View style={styles.billContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>Order Date: {formatDate(item.completionTime)}</Text>
        <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
      </View>

      <View style={styles.itemsContainer}>
        {item.dataCartItems.map((cartItem, index) => (
          <View key={`${item.id}-${index}`} style={styles.itemWrapper}>
              <View style={styles.itemTop}>
              <Image
                source={{ uri: cartItem.coffeeData.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{cartItem.coffeeData.name}</Text>
                <Text style={styles.itemCategory}>{cartItem.coffeeData.category}</Text>
              </View>
            </View>
            <View style={styles.itemSpecs}>
                <Text style={
                  [styles.itemSpecText,{marginLeft: 8,width: 45,borderTopLeftRadius: 7,borderEndStartRadius:7}]}>{cartItem.selectedSize}</Text>
                <Text style={
                  [styles.itemSpecText,{marginLeft: -54,borderEndEndRadius:7,borderTopEndRadius:7,width: 80}]}>
                    <Text style={{color:'#D17842',fontSize:13}}>$ </Text>{cartItem.coffeeData.price}
                    </Text>
                <Text style={styles.itemSpecText2}> <Text style={{color:'#D17842',fontSize:15}}>X</Text> {cartItem.quantity}</Text>
                <Text style={[styles.itemSpecText2,{color:'#D17842',fontSize:20}]}>
                {(cartItem.quantity * cartItem.coffeeData.price).toFixed(2)}
                  </Text>
            </View>
          </View>
          
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0C0F14" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={pressToSetting}>
            <Image source={require('../../assets/images/Vector.png')} />
        </TouchableOpacity>
        <Text
            style={{
            color: 'white',
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            lineHeight: 36,
            fontWeight: '600',
            }}>
            Favorites
        </Text>
        <TouchableOpacity>
            <Image
            style={styles.profileImage}
            source={require('../../assets/images/face.png')}
            />
        </TouchableOpacity>
        </View>

      {/* Order List */}
      <FlatList
        data={billData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 15
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
    borderRadius: 15,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#21262E',
    borderRadius: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  listContent: {
    paddingBottom: 30,
  },
  billContainer: {
    backgroundColor: '#161A1D',
    borderRadius: 14,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDate: {
    color: '#828282',
    fontSize: 13,
    fontWeight: '500',
  },
  totalAmount: {
    color: '#D17842',
    fontSize: 16,
    fontWeight: '700',
  },
  itemsContainer: {
    gap: 12,
  },
  itemWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#21262E',
    borderRadius: 10,
    padding: 12,
    gap: 14,
  },
  itemTop:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    gap: 6,
    marginLeft: 10
  },
  itemName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemCategory: {
    color: '#828282',
    fontSize: 13,
    fontWeight: '300',
  },
  itemSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Thêm dòng này
    alignItems: 'center', // Căn giữa theo chiều dọc
    width: '100%', // Chiếm toàn bộ chiều rộng
    marginTop: 8, // Thêm khoảng cách với phần trên
  },
  itemSpecText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: '#D17842', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    textAlign: 'center', 
    backgroundColor:'#0C0F14'
  },
  itemSpecText2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: '#D17842',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  itemPrice: {
    color: '#D17842',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 70,
    textAlign: 'right',
  },
  listSeparator: {
    height: 16,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: '#D17842',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default OrderScreen;