import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import ProductCard from '~/components/ProductCard';
import { useProductFilters } from '~/app/hooks/useProductFilters';

export default function HomeScreen() {
  const {
    selectedCategory,
    setCategory,
    modalVisible,
    setModalVisible,
    categoriesData,
    isLoadingCategories,
    errorCategories,
    productsQuery,
    sortedProducts,
  } = useProductFilters();

  if (productsQuery?.error) {
    return (
      <Text style={styles.centered}>Error loading products: {productsQuery.error.message}</Text>
    );
  }

  if (errorCategories) {
    console.warn('Error loading categories:', errorCategories.message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterButtonContainer}>
        {selectedCategory && <Text>Filtered by {selectedCategory}</Text>}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {isLoadingCategories ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <FlatList
                data={categoriesData || []}
                keyExtractor={(item) => item.slug}
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      styles.categoryOption,
                      selectedCategory === item.slug && styles.selectedCategoryOption,
                    ]}
                    onPress={() => {
                      setCategory(item.slug);
                      setModalVisible(false);
                    }}>
                    <Text
                      style={[
                        styles.categoryOptionText,
                        selectedCategory === item.slug && styles.selectedCategoryOptionText,
                      ]}>
                      {item.name}
                    </Text>
                  </Pressable>
                )}
                ListHeaderComponent={
                  <Pressable
                    style={[
                      styles.categoryOption,
                      selectedCategory === null && styles.selectedCategoryOption,
                    ]}
                    onPress={() => {
                      setCategory(null);
                      setModalVisible(false);
                    }}>
                    <Text
                      style={[
                        styles.categoryOptionText,
                        selectedCategory === null && styles.selectedCategoryOptionText,
                      ]}>
                      All Categories
                    </Text>
                  </Pressable>
                }
                ListEmptyComponent={
                  <Text style={styles.emptyListText}>No categories available</Text>
                }
              />
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={sortedProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
        onRefresh={productsQuery.refetch}
        refreshing={productsQuery.isFetching && !productsQuery.isLoading}
        ListEmptyComponent={
          productsQuery?.isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Text style={styles.emptyListText}>
              No products found for "{selectedCategory || 'All Categories'}"
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#f5f5f5',
  },
  selectedCategoryOption: {
    backgroundColor: '#007AFF',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});
