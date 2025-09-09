  import React, {useState, useEffect} from 'react';
  import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    View,
    Platform,
  } from 'react-native';
  import {useNavigation} from '@react-navigation/native';
  import ConfirmSuc from './constants/ConfirmSuc';
  import { RouteProp } from '@react-navigation/native';
  import { SafeAreaView } from 'react-native-safe-area-context';

  type PaymentScreenRouteProp = RouteProp<{ params: { totalAmount: number; dataCartItems: any[]; quantityBuy: number } }, 'params'>;

  const PaymentScreen = ({ route }: { route: PaymentScreenRouteProp }) => {
    const {totalAmount, dataCartItems, quantityBuy} = route.params;
    const [selectedMethod, setSelectedMethod] = useState('creditCard');
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const navigation = useNavigation();

    console.log('Total Amount:', totalAmount);
    console.log('hhihi', dataCartItems[0].coffeeData.id);

    const handlePayment = async () => {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
      const day = currentTime.getDate();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      console.log(formattedTime);

      const paymentData = {
        dataCartItems: dataCartItems,
        paymentMethod: selectedMethod.name,
        totalAmount: totalAmount,
        quantityBuy: quantityBuy,
        completionTime: formattedTime,
      };

      try {
        const response = await fetch('http://localhost:3000/billOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });
    
        if (response.ok) {
          console.log('Thanh toán thành công!');
    
          // Xóa từng item trong giỏ hàng
          try {
            // Tạo mảng các promise xóa item
            const deletePromises = dataCartItems.map(async (item) => {
              try {
                const deleteResponse = await fetch(`http://localhost:3000/cart/${item.coffeeData.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    // Thêm authorization header nếu cần
                    // 'Authorization': `Bearer ${token}`
                  },
                });
    
                if (!deleteResponse.ok) {
                  console.error(`Lỗi khi xóa item ${item.coffeeData.id}:`, deleteResponse.status);
                }
                return deleteResponse.ok;
              } catch (error) {
                console.error(`Lỗi khi xóa item ${item.coffeeData.id}:`, error);
                return false;
              }
            });
    
            // Đợi tất cả các request xóa hoàn thành
            const results = await Promise.all(deletePromises);
            
            // Kiểm tra kết quả
            if (results.every(Boolean)) {
              console.log('Đã xóa toàn bộ giỏ hàng thành công');
            } else {
              console.warn('Một số item không xóa được');
            }
    
          } catch (deleteError) {
            console.error('Lỗi trong quá trình xóa giỏ hàng:', deleteError);
          }
    
          setIsPaymentSuccessful(true);
        } else {
          console.error('Lỗi khi thanh toán:', response.status);
        }
      } catch (error) {
        console.error('Lỗi khi thực hiện thanh toán:', error);
      }
    
    };

    const pressToSetting = () => {
      navigation.goBack();
    };
    const handlePaymentMethodSelect = (method: { id: string; name: string; image: any }) => {
      setSelectedMethod(method);
    };

    const paymentMethods = [
      {
        id: 'creditCard',
        name: 'Credit Card',
        image: require('../assets/images/wallet.png'),
      },
      {
        id: 'googlePay',
        name: 'Google Pay',
        image: require('../assets/images/ggpay.png'),
      },
      {
        id: 'applePay',
        name: 'Apple Pay',
        image: require('../assets/images/apple.png'),
      },
      {
        id: 'amazon',
        name: 'Amazon Pay',
        image: require('../assets/images/amazon.png'),
      },
    ];

    

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image source={require('../assets/images/back.png')} style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment</Text>
            <View style={{width: 30}}/>
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>
            {/* Credit Card Section */}
            {selectedMethod === 'creditCard' && (
              <View style={styles.cardSection}>
                <View style={styles.cardHeader}>
                  <Image source={require('../assets/images/left.png')} style={styles.visaLogo}/>
                  <Image source={require('../assets/images/visa.png')} style={styles.visaLogo}/>
                </View>
                
                <Text style={styles.cardNumber}>3897 8923 6745 4638</Text>
                
                <View style={styles.cardHolderSection}>
                  <Text style={styles.cardLabel}>Card Holder Name</Text>
                  <Text style={styles.cardHolderName}>Hoàng Tiến Đạt</Text>
                </View>
              </View>
            )}

            {/* Payment Methods */}
            <View style={styles.paymentMethodsContainer}>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodButton,
                    selectedMethod === method.id && styles.selectedMethod
                  ]}
                  onPress={() => setSelectedMethod(method.id)}>
                  <Image source={method.image} style={styles.methodIcon}/>
                  <Text style={styles.methodName}>{method.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Total Price */}
            <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginEnd: 30,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#AEAEAE',
                      fontSize: 12,
                      fontWeight: 'bold',
                      lineHeight: 20,
                    }}>
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#D17842',
                      fontSize: 18,
                      fontWeight: 'bold',
                      // fontFamily: 'Poppins-Regular',
                      lineHeight: 20,
                    }}>
                    ${totalAmount}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#D17842',
                    borderRadius: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handlePayment()}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Pay from {selectedMethod.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <ConfirmSuc
                isVisible={isPaymentSuccessful}
                onClose={() => {
                  setIsPaymentSuccessful(false);
                  // Chuyển hướng đến màn hình HomeScreen
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                  });
                }}
              />
          </ScrollView>

          {/* Payment Button */}
          

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
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#262B33',
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#21262E',
    },
    backIcon: {
      width: 20,
      height: 20,
      tintColor: 'white',
    },
    headerTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      paddingBottom: 100,
    },
    cardSection: {
      backgroundColor: '#262B33',
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      color: '#D17842',
      fontSize: 16,
      fontWeight: '600',
    },
    visaLogo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    cardNumber: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: 2,
      marginBottom: 20,
    },
    cardHolderSection: {
      borderTopWidth: 1,
      borderTopColor: '#363B43',
      paddingTop: 15,
    },
    cardLabel: {
      color: '#828282',
      fontSize: 12,
      marginBottom: 5,
    },
    cardHolderName: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    paymentMethodsContainer: {
      marginTop: 20,
    },
    methodButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#262B33',
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
    },
    selectedMethod: {
      borderWidth: 2,
      borderColor: '#D17842',
      backgroundColor: '#2D333B',
    },
    methodIcon: {
      width: 30,
      height: 30,
      marginRight: 15,
    },
    methodName: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    totalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      paddingHorizontal: 10,
    },
    totalLabel: {
      color: '#AEAEAE',
      fontSize: 16,
    },
    totalAmount: {
      color: '#D17842',
      fontSize: 18,
      fontWeight: '700',
    },
    paymentButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: '#D17842',
      borderRadius: 20,
      padding: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paymentButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    paymentAmount: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
    },
  });

  export default PaymentScreen;