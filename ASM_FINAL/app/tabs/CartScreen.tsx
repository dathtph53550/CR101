  import React, { useState, useEffect, useCallback } from 'react';
  import {
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    Alert,
  } from 'react-native';
  import { useFocusEffect, useNavigation } from '@react-navigation/native';
  import ConfirmPay from '../constants/ConfirmPay';

  const CartScreen = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const navigation = useNavigation<any>();

    const pressToSetting = () => {
      navigation.navigate('SettingScreen');
    };

    const handleLongPressToDelete = (id: string) => {
      Alert.alert(
        'Xác nhận xoá',
        'Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?',
        [
          { text: 'Hủy', style: 'cancel' },
          { 
            text: 'Xóa', 
            onPress: async () => {
              try {
                const response = await fetch(`http://localhost:3000/cart/${id}`, {
                  method: 'DELETE',
                });
    
                if (!response.ok) {
                  throw new Error('Lỗi khi xoá sản phẩm');
                }
    
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
              } catch (error) {
                console.error('Lỗi khi xoá sản phẩm:', error);
                Alert.alert('Lỗi', 'Không thể xoá sản phẩm khỏi giỏ hàng');
              }
            } 
          }
        ]
      );
    };

    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart');
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu giỏ hàng');
        const data = await response.json();
        setCartItems(data);
        console.log(cartItems);
      } catch (error) {
        console.error('Lỗi khi fetch giỏ hàng:', error);
      }
    };

    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach(item => {
        const price = item.coffeeData ? item.coffeeData.price : item.price;
        total += price * item.quantity;
      });
      setTotalPrice(total);
    };

    const handleQuantityChange = (id: string, change: number) => {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );
    };

    useFocusEffect(
        useCallback(() => {
          fetchCartData();
        }, [])
      );

    // useEffect(() => {
    //   fetchCartData();
    // }, []);

    useEffect(() => {
      calculateTotalPrice();
    }, [cartItems]);

    const handlePay = () => {
      setConfirmationVisible(true);
    };

    const onCancelPayment = () => {
      setConfirmationVisible(false);
    };

    const onConfirmPayment = () => {
      const formattedCartItems = cartItems.map(item => ({
        coffeeData: item.coffeeData || {
          id: item.id || item.id,
          coffeeId: item.coffeeId,
          name: item.name,
          image: item.image,
          price: item.price,
          category: item.category
        },
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }));

      const paymentData = {
        dataCartItems: formattedCartItems,
        totalAmount: totalPrice,
      };

      navigation.navigate('PaymentScreen', paymentData);
      setConfirmationVisible(false);
      fetchCartData(); 
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0C0F14' }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar backgroundColor={'#0C0F14'} barStyle="light-content" />

          <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={pressToSetting}>
              <Image source={require('../../assets/images/Vector.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>Cart</Text>
            <TouchableOpacity>
              <Image style={styles.profileImage} source={require('../../assets/images/face.png')} />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, flex: 1 }}>
            {cartItems.length > 0 ? (
              <>
                <FlatList
                  data={cartItems}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onLongPress={() => handleLongPressToDelete(item.id)}>
                      <View style={styles.cartItem} >
                          <Image style={styles.itemImage} source={{ uri: item.image }} />
                          <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemOrigin}>From Africa</Text>
                            <View style={styles.itemRow}>
                              <View style={styles.sizeBox}>
                                <Text style={styles.sizeText}>{item.selectedSize}</Text>
                              </View>
                              <Text style={styles.itemPrice}>${item.price}</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                              <TouchableOpacity
                                style={styles.buttonQuantity}
                                onPress={() => handleQuantityChange(item.id, -1)}>
                                <Text style={styles.buttonText}>-</Text>
                              </TouchableOpacity>
                              <Text style={styles.quantityText}>{item.quantity}</Text>
                              <TouchableOpacity
                                style={styles.buttonQuantity}
                                onPress={() => handleQuantityChange(item.id, 1)}>
                                <Text style={styles.buttonText}>+</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View>
                            
                          </View>
                      </View>
                    </TouchableOpacity> 
                    
                  )}
                />

                <View style={styles.paymentContainer}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                  <ConfirmPay
                    isVisible={isConfirmationVisible}
                    onCancel={onCancelPayment}
                    onConfirm={onConfirmPayment}
                    amount={totalPrice}
                  />
                </View>
              </>
            ) : (
              <View style={styles.emptyCart}>
                <Image source={require('../../assets/images/coca.png')} style={styles.emptyImage} />
                <Text style={styles.emptyText}>Please choose something...</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C0F14',
    },
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
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    cartItem: {
      backgroundColor: '#061530',
      width: 380,
      height: 154,
      borderRadius: 23,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
    },
    itemImage: {
      width: 126,
      height: 126,
      borderRadius: 23,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 13,
    },
    itemName: {
      color: 'white',
      fontSize: 15,
      fontWeight: '700',
    },
    itemOrigin: {
      marginTop: 4,
      color: '#AEAEAE',
      fontSize: 12,
    },
    itemRow: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sizeBox: {
      width: 72,
      height: 35,
      backgroundColor: '#0C0F14',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginRight: 20,
    },
    sizeText: {
      color: '#AEAEAE',
      fontSize: 12,
      fontWeight: 'bold',
    },
    itemPrice: {
      color: '#D17842',
      fontSize: 20,
      fontWeight: 'bold',
    },
    priceText: {
      color: 'white',
      fontSize: 20,
    },
    quantityContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityText: {
      color: 'white',
      fontSize: 16,
      marginHorizontal: 10,
    },
    paymentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
    },
    totalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    totalText: {
      color: '#AEAEAE',
      fontSize: 12,
      fontWeight: 'bold',
    },
    totalAmount: {
      color: '#D17842',
      fontSize: 16,
      fontWeight: 'bold',
    },
    payButton: {
      flex: 1,
      backgroundColor: '#D17842',
      borderRadius: 20,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    payButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    emptyCart: {
      marginTop: 100,
      alignItems: 'center',
    },
    emptyImage: {
      width: 100,
      height: 100,
    },
    emptyText: {
      color: '#AEAEAE',
      fontSize: 12,
      fontWeight: 'bold',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonQuantity: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D17842',
      borderRadius: 10,
      borderWidth: 1,
    }
  });

  export default CartScreen;
