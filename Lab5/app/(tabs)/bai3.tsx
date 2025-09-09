import { 
    View, Text, StyleSheet, 
    ImageBackground, StatusBar, 
    TouchableOpacity 
} from "react-native";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';

const Bai3 = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            
            <ImageBackground 
                style={styles.background}
                source={{ uri: 'https://images.pexels.com/photos/17406698/pexels-photo-17406698/free-photo-of-thanh-ph-m-c-toa-nha-cay.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            >
                <View style={styles.navbar}>
                    <View>
                        <FontAwesome name="arrow-left" size={24} color="#fff" />
                    </View>
                    <View >
                        <FontAwesome name="ellipsis-v" size={24} color="#fff" />
                    </View>
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>VĂN MIẾU QUỐC TỬ GIÁM</Text>
                    <View style={styles.rating}>
                        <FontAwesome name="star" size={20} color="yellow" />
                        <Text style={styles.ratingText}>5.0</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.favoriteButton}>
                    <FontAwesome name="heart" size={24} color="red" />
                </TouchableOpacity>

                <View style={styles.detail}>
                    <Text style={styles.location}>
                        <FontAwesome name="map-marker" size={16} color="blue" />  Hà Nội
                    </Text>
                    <Text style={styles.heading}>Thông tin chuyến đi</Text>
                    <Text style={styles.description}>
                        Văn Miếu – Quốc Tử Giám là quần thể di tích đa dạng, phong phú hàng đầu của thành phố Hà Nội, 
                        nằm ở phía Nam kinh thành Thăng Long. Quần thể kiến trúc Văn Miếu – 
                        Quốc Tử Giám bao gồm: hồ Văn, khu Văn Miếu – Quốc Tử Giám và vườn Giám, 
                        mà kiến trúc chủ thể là Văn miếu (chữ Hán: 文廟) - nơi thờ Khổng Tử, và Quốc 
                        tử giám 
                    </Text>
                </View>
            <View style={styles.footer}>
                <Text style={styles.price}>$100<Text style={styles.ngay}> /Ngày</Text></Text>
                <TouchableOpacity style={styles.btnDat}>
                    <Text style={styles.txtDatNgay}>Đặt ngay</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        position: 'absolute',
        bottom: 350,
        left: 20,
        right: 19,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: '../assets/fonts/Oswald',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 5,
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 295,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        elevation: 5,
        zIndex: 10
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
        fontSize: 13,
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
        bottom: 49,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: '#33CCFF',
        borderColor: '#ddd',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    ngay: {
        fontSize: 14,
        color: '#fffff',
    },
    btnDat: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    txtDatNgay: {
        color: '#3366FF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    

});

export default Bai3;
