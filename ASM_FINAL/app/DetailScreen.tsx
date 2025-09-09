import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { RouteProp } from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<{ params: { coffeeData: any } }, 'params'>;

const cartScreen = 'CartScreen';

const DetailScreen = ({ route }: { route: DetailScreenRouteProp }) => {
  const {coffeeData} = route.params;
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(coffeeData.favorites);
  interface CartItem {
    coffeeData: any;
    selectedSize: string;
    quantity: number;
  }
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigation = useNavigation<any>();

  const handleSizePress = (size: string) => {
    
    setSelectedSize(size);
  };

  const handleFavoritePress = async () => {
    setIsFavorite(!isFavorite); 
  
    try {
      const response = await fetch(`http://localhost:3000/all/${coffeeData.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: !isFavorite }),
      });
  
      if (!response.ok) {
        console.error('Lỗi khi cập nhật dữ liệu yêu thích:', await response.text());
        setIsFavorite(isFavorite); 
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu cập nhật:', error);
      setIsFavorite(isFavorite); 
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // const handleAddToCart = () => {
  //   console.log('Cart');
  //   if (selectedSize) {
  //     const newItem = {
  //       coffeeData: coffeeData,
  //       selectedSize: selectedSize,
  //       quantity: 1,
  //     };

  //     const existingItemIndex = cartItems.findIndex(
  //       item => item.coffeeData.id === coffeeData.id,
  //     );

  //     if (existingItemIndex !== -1) {
  //       cartItems[existingItemIndex].quantity += 1;
  //     } else {
  //       setIsAddingToCart(true);
  //       setCartItems(prevItems => [...prevItems, newItem]);
  //     }
  //   } else {
  //     console.log('Vui lòng chọn Size');
  //   }
  // };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      console.log('Vui lòng chọn Size');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/cart');
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu giỏ hàng');
      }
  
      const cartItems = await response.json();
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = cartItems.find(
        (item: any) =>
          item.coffeeId === coffeeData.id && item.selectedSize === selectedSize
      );
  
      if (existingItem) {
        // Nếu sản phẩm có cùng size đã tồn tại, cập nhật số lượng
        const updateResponse = await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
        });
  
        if (!updateResponse.ok) {
          throw new Error('Lỗi khi cập nhật số lượng sản phẩm');
        }
  
        console.log(`Số lượng sản phẩm đã cập nhật: ${existingItem.quantity + 1}`);
      } else {
        // Nếu sản phẩm chưa có hoặc có size khác, thêm mới vào giỏ hàng
        const newItem = {
          id: Math.random().toString(36).substr(2, 4), // Tạo ID ngẫu nhiên
          coffeeId: coffeeData.id,
          name: coffeeData.name,
          image: coffeeData.image,
          price: coffeeData.price,
          selectedSize: selectedSize,
          category: coffeeData.category,
          quantity: 1,
        };
  
        const addResponse = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
  
        if (!addResponse.ok) {
          throw new Error('Lỗi khi thêm sản phẩm vào giỏ hàng');
        }
  
        console.log('Thêm sản phẩm mới vào giỏ hàng:', newItem);
      }
  
      // Điều hướng đến CartScreen sau khi thêm hoặc cập nhật
      // navigation.navigate(cartScreen);
    } catch (error) {
      console.error('Lỗi khi xử lý giỏ hàng:', error);
    }
  };

  useEffect(() => {
    if (isAddingToCart) {
      navigation.navigate(cartScreen, {cartItems: cartItems});
      setIsAddingToCart(false); 
    }
  }, [cartItems, isAddingToCart]);

  const renderSizeOptions = () => {
    if (coffeeData.category === 'Bean') {
      return (
        <>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === '250gm' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('250gm')}>
            <Text style={styles.sizeButtonText}>250gm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === '500gm' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('500gm')}>
            <Text style={styles.sizeButtonText}>500gm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === '1000gm' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('1000gm')}>
            <Text style={styles.sizeButtonText}>1000gm</Text>
          </TouchableOpacity>
        </>
      );
    } else if (coffeeData.category === 'Coffee') {
      return (
        <>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === 'S' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('S')}>
            <Text style={styles.sizeButtonText}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === 'M' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('M')}>
            <Text style={styles.sizeButtonText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              selectedSize === 'L' && styles.selectedSize,
            ]}
            onPress={() => handleSizePress('L')}>
            <Text style={styles.sizeButtonText}>L</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 7
            // , resizeMode: 'cover'
        }}
        source={{uri: coffeeData.image}}>
        {/* header */}
        <View style={{flex: 6}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginTop: 60,
            }}>
            <TouchableOpacity
              style={{
                width: 33,
                height: 33,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#21262E',
                borderRadius: 10,
              }}
              onPress={handleBackPress}>
              <Image
                style={{width: 13, height: 15}}
                source={require('../assets/images/back.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 33,
                height: 33,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#21262E',
                borderRadius: 10,
              }}
              onPress={handleFavoritePress}>
              <Image
                style={{width: 18, height: 16}}
                tintColor={isFavorite ? '#D17842' : 'white'}
                source={require('../assets/images/favor.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* body */}
        <View
          style={{
            flex: 2.5,
            backgroundColor: 'rgba(20, 25, 33, 0.7)',
            borderTopLeftRadius: 25,
            borderTopEndRadius: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{marginStart: 22}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 36,
                marginTop: 20,
              }}>
              {coffeeData.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#AEAEAE',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 20,
              }}>
              From Africa
            </Text>
            <View
              style={{
                width: 53,
                height: 22,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
              }}>
              <Image
                style={{width: 22, height: 22}}
                tintColor="#D17842"
                source={require('../assets/images/star.png')}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  color: 'white',
                  marginStart: 5,
                  fontSize: 16,
                }}>
                {coffeeData.star}
              </Text>
            </View>
          </View>
          <View style={{marginEnd: 22, alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
                width: 140,
                marginTop: 20,
              }}>
              <View
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#21262E',
                  borderRadius: 10,
                  marginRight: 20,
                }}>
                <Image
                  tintColor="#D17842"
                  source={
                    coffeeData.category === 'Coffee'
                      ? require('../assets/images/hatcoffee.png')
                      : require('../assets/images/beanImg.png')
                  }
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#AEAEAE',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 20,
                  }}>
                  {coffeeData.category}
                </Text>
              </View>
              <View
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#21262E',
                  borderRadius: 10,
                }}>
                {coffeeData.category === 'Coffee' ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      tintColor="#D17842"
                      source={require('../assets/images/water.png')}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#AEAEAE',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 20,
                        marginTop: 4,
                      }}>
                      {coffeeData.ingredient}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      tintColor="#D17842"
                      source={require('../assets/images/location.png')}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#AEAEAE',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 20,
                        marginTop: 4,
                      }}>
                      {coffeeData.location}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                width: 140,
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#21262E',
                borderRadius: 10,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#AEAEAE',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 20,
                }}>
                Medium Roasted
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      {/* footer */}
      <View
        style={{flex: 4, backgroundColor: '#0C0F14', paddingHorizontal: 20}}>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#AEAEAE',
              fontSize: 17,
              fontWeight: 'bold',
              lineHeight: 36,
              marginTop: 10,
            }}>
            Description
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 20,
              height: 60,
            }}
            numberOfLines={3}>
            {coffeeData.description}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#AEAEAE',
              fontSize: 17,
              fontWeight: 'bold',
              lineHeight: 36,
              marginTop: 15,
            }}>
            Size
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            {/* Size Options */}
            {renderSizeOptions()}
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
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
                Price
              </Text>
              <Text
                style={{
                  color: '#D17842',
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  lineHeight: 20,
                }}>
                $
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {`${coffeeData.price}`}
                </Text>
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
              onPress={() => handleAddToCart()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sizeButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21262E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#21262E',
  },
  selectedSize: {
    borderColor: '#D17842',
  },
  sizeButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#AEAEAE',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  sizeOption: {},
});

export default DetailScreen;
