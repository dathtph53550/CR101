import { 
    View, Text, StyleSheet, 
    ImageBackground, StatusBar, 
    TouchableOpacity 
} from "react-native";
import React, { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    withTiming,
    withRepeat,
    withSequence
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Bai4 = () => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withSequence(
                withTiming(1000, { duration: 1000 })
            ),
            -1, 
        );
    }, []);

    const animatedGradientStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        };
    });
    const favoriteScale = useSharedValue(1);
    const detailTranslateY = useSharedValue(200);
    const btnPressScale = useSharedValue(1);

    useEffect(() => {
        detailTranslateY.value = withTiming(0, { duration: 800 });
    }, []);

    const animatedFavoriteStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: favoriteScale.value }]
        };
    });

    const animatedDetailStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: detailTranslateY.value }]
        };
    });

    const animatedBtnStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: btnPressScale.value }]
        };
    });

    const handleFavoritePress = () => {
        favoriteScale.value = withSpring(1.2, { damping: 2 }, () => {
            favoriteScale.value = withSpring(1);
        });
    };

    const handleBtnPressIn = () => {
        btnPressScale.value = withSpring(0.9);
    };

    const handleBtnPressOut = () => {
        btnPressScale.value = withSpring(1);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            
            <ImageBackground 
                style={styles.background}
                source={{ uri: 'https://images.pexels.com/photos/17406698/pexels-photo-17406698/free-photo-of-thanh-ph-m-c-toa-nha-cay.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            >
                <View style={styles.navbar}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                    <FontAwesome name="ellipsis-v" size={24} color="#fff" />
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>VĂN MIẾU QUỐC TỬ GIÁM</Text>
                    <View style={styles.rating}>
                        <FontAwesome name="star" size={16} color="yellow" />
                        <Text style={styles.ratingText}>5.0</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.favoriteContainer}>
                    <Animated.View style={[styles.gradientBorder, animatedGradientStyle]}>
                        <LinearGradient
                            colors={['#ff0000', '#ff7300', '#ffeb00', '#48ff00', '#00ffee', '#0900ff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}
                        />
                    </Animated.View>
                    <View style={styles.favoriteButton}>
                        <FontAwesome name="heart" size={24} color="red" />
                    </View>
                </TouchableOpacity>

                {/* <Animated.View style={[styles.favoriteButton, animatedFavoriteStyle]}>
                    <TouchableOpacity onPress={handleFavoritePress}>
                        <FontAwesome name="heart" size={24} color="red" />
                    </TouchableOpacity>
                </Animated.View> */}

                <Animated.View style={[styles.detail, animatedDetailStyle]}>
                    <Text style={styles.location}>
                        <FontAwesome name="map-marker" size={16} color="blue" />  Hà Nội
                    </Text>
                    <Text style={styles.heading}>Thông tin chuyến đi</Text>
                    <Text style={styles.description}>
                        Văn Miếu – Quốc Tử Giám là quần thể di tích đa dạng, phong phú hàng đầu của thành phố Hà Nội, 
                        nằm ở phía Nam kinh thành Thăng Long. Quần thể kiến trúc Văn Miếu – 
                        Quốc Tử Giám bao gồm: hồ Văn, khu Văn Miếu – Quốc Tử Giám và vườn Giám, 
                        mà kiến trúc chủ thể là Văn miếu (chữ Hán: 文廟) - nơi thờ Khổng Tử, và Quốc tử giám.
                    </Text>
                </Animated.View>

                <View style={styles.footer}>
                    <Text style={styles.price}>$100<Text style={styles.ngay}>/Ngày</Text></Text>
                    
                    <Animated.View style={animatedBtnStyle}>
                        <TouchableOpacity 
                            style={styles.btnDat}
                            onPressIn={handleBtnPressIn}
                            onPressOut={handleBtnPressOut}
                        >
                            <Text style={styles.txtDatNgay}>Đặt ngay</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    navbar: {
        position: 'absolute',
        top: 50,
        left: 25,
        right: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        position: 'absolute',
        bottom: 330,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
    favoriteButton: {
        // position: 'absolute',
        // bottom: 305,
        // right: 20,
        // backgroundColor: '#fff',
        // padding: 10,
        // boxShadow: '0 5px 15px rgba(0, 0, 0, 0.6)',
        // borderRadius: 50,
        // elevation: 5,
        // zIndex: 10
        width: 41,
        height: 41,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.6)'
    },
    detail: {
        position: 'absolute',
        bottom: 120,
        right: 0,
        left: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    location: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        left: 0,
        right: 0,
        bottom: 45,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    btnDat: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    txtDatNgay: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    ngay: {
        fontSize: 15,
        color: '#333',
    },
    favoriteContainer: {

        position: 'absolute',
        bottom: 297,
        right: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    gradientBorder: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 3,

    },
    gradient: {
        flex: 1,
        borderRadius: 25,
    }
});

export default Bai4;
