import React, { useEffect, useState, useCallback } from 'react';
import { Text, ScrollView, Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Product } from '~/app/core/types';
import { productKeys } from '~/app/services/queryKeys';
import { getProductById } from '~/app/services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [image, setImage] = useState<string>('');

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: productKeys.detail(Number(id)),
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      setImage(product.images[0]);
    }
  }, [product]);

  const handleAddReminder = useCallback(async () => {
    if (!product) return;
    try {
      const reminderDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
      await addPurchaseReminder(product.title, reminderDate);
      Alert.alert('Reminder added', 'A purchase reminder was added to your calendar.');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed to add reminder.');
    }
  }, [product]);

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>Error loading product: {error.message}</Text>;
  }

  if (!product) {
    return <Text style={styles.centered}>Product not found.</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen options={{ title: product.title }} />
      <Image source={{ uri: image }} style={styles.thumbnail} resizeMode="contain" />
      {product.images && product.images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          {product.images.map((imgUrl, index) => (
            <Pressable onPress={() => setImage(imgUrl)} key={index}>
              <Image source={{ uri: imgUrl }} style={styles.galleryImage} resizeMode="contain" />
            </Pressable>
          ))}
        </ScrollView>
      )}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.brand}>Brand: {product.brand}</Text>
      <Text style={styles.price}>
        Price: ${product.price.toFixed(2)} (Discount: {product.discountPercentage}%)
      </Text>
      <Text style={styles.rating}>Rating: {product.rating?.toFixed(1)}/5</Text>
      <Text style={styles.stock}>
        Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
      </Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.descriptionTitle}>Description:</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 12,
    paddingBottom: 36,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  imageScroll: {
    marginBottom: 15,
  },
  galleryImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  brand: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
  },
  stock: {
    fontSize: 16,
    marginBottom: 5,
    color: 'orange',
  },
  category: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
