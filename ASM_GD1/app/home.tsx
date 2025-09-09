import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet ,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  const coffeeCategories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];
  const coffeeItems = [
    { id: '1', name: 'Cappuccino', description: 'With Steamed Milk', price: 4.2, rating: 4.5, image: require('../assets/images/cappucino1.png') },
    { id: '2', name: 'Cappuccino', description: 'With Foam', price: 4.2, rating: 4.2, image: require('../assets/images/cappucino2.png') },
    { id: '3', name: 'Cappuccino', description: 'With Foam', price: 4.2, rating: 4.2, image: require('../assets/images/cappucino2.png') },
  ];
  const coffeeBeans = [
    { id: '1', name: 'Robusta Beans', description: 'Medium Roasted', price: 4.2,rating: 4.3 ,image: require('../assets/images/coffee1.png') },
    { id: '2', name: 'Cappuccino', description: 'With Steamed Milk', price: 4.2,rating: 4.0 , image: require('../assets/images/coffee2.png') },
    { id: '3', name: 'Cappuccino', description: 'With Steamed Milk', price: 4.2,rating: 4.9 , image: require('../assets/images/coffee2.png') },
  ];

  const renderCoffeeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('detail', { item })} 
    >
      <Image source={item.image} style={styles.coffeeImage} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFCC00" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="grid" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/images/user.png')} style={styles.userIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Find the best coffee for you</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput style={styles.searchInput} placeholder="Find Your Coffee..." placeholderTextColor="#aaa" />
        </View>

        <View style={styles.categoriesContainer}>
          {coffeeCategories.map((category, index) => (
            <TouchableOpacity key={index}>
              <Text style={[styles.categoryText, index === 0 && styles.activeCategory]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={coffeeItems}
          renderItem={renderCoffeeItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Coffee beans</Text>

        <FlatList
          data={coffeeBeans}
          renderItem={renderCoffeeItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <View style={styles.footer}>
          <Ionicons name="home" size={24} color="#D17842" />
          <Ionicons name="lock-closed" size={24} color="#fff" />
          <Ionicons name="heart" size={24} color="#fff" />
          <Ionicons name="notifications" size={24} color="#fff" />
          <Ionicons name="person" size={24} color="#fff" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryText: {
    color: '#aaa',
    fontSize: 14,
    marginRight: 15,
  },
  activeCategory: {
    color: '#D17842',
  },
  horizontalList: {
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: 160,
    marginRight: 15,
    padding: 10,
    overflow: 'hidden',
  },
  coffeeImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D17842',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 10,
  },
});

export default HomeScreen;
