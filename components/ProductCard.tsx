import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '~/app/core/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={{ pathname: '/product/[id]', params: { id: product.id.toString() } }} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>Rating: {product.rating?.toFixed(1)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 12,
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    minHeight: 36,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 2,
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductCard;
