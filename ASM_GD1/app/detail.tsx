import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Section with Image */}
      <View style={styles.topSection}>
        {/* Image */}
        <Image
          source={require('../assets/images/coffee.png')}
          style={styles.image}
        />

        {/* Header Buttons */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>❤</Text>
          </TouchableOpacity>
        </View>

        {/* Overlay Content */}
        <View style={styles.overlay}>
          <Text style={styles.title}>Cappuccino</Text>
          <Text style={styles.subtitle}>With Steamed Milk</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ 4.5</Text>
            <Text style={styles.ratingCount}>(6,879)</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section with Content */}
      <View style={styles.bottomSection}>
        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Coffee</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Milk</Text>
          </View>
          <View style={styles.tagMedium}>
            <Text style={styles.tagText}>Medium Roasted</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Cappuccino is a latte made with more foam than steamed milk, often
          with a sprinkle of cocoa powder or cinnamon on top.
        </Text>

        {/* Size */}
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeRow}>
          <TouchableOpacity style={styles.sizeButtonSelected}>
            <Text style={styles.sizeTextSelected}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton}>
            <Text style={styles.sizeText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton}>
            <Text style={styles.sizeText}>L</Text>
          </TouchableOpacity>
        </View>

        {/* Price & Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>$ 4.20</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topSection: {
    height: height * 0.4,
    position: 'relative',
  },
  image: {
    width: width,
    height: 400,
  },
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 18,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    bottom: -90,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A6A6A6',
    fontSize: 16,
    marginVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rating: {
    color: '#F4C430',
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    color: '#A6A6A6',
    fontSize: 14,
  },
  bottomSection: {
    flex: 1,
    padding: 16,
    marginTop: 70,
  },
  tagsRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#1E1E1E',
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  tagMedium: {
    backgroundColor: '#1E1E1E',
    padding: 8,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    color: '#A6A6A6',
    fontSize: 14,
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeButton: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  sizeButtonSelected: {
    backgroundColor: '#D17842',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  sizeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  sizeTextSelected: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D17842',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
