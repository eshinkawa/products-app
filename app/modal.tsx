import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  categories: string[] | undefined;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isLoadingCategories: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  isLoadingCategories,
}) => {
  const handleCategorySelect = (category: string | null) => {
    onSelectCategory(category);
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: string }) => {
    const isAllCategories = item === 'All Categories';
    const isSelected = isAllCategories ? selectedCategory === null : selectedCategory === item;

    return (
      <TouchableOpacityzoo
        style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
        onPress={() => handleCategorySelect(isAllCategories ? null : item)}>
        <Text style={isSelected ? styles.selectedCategoryText : styles.categoryText}>{item}</Text>
      </TouchableOpacityzoo>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Filter by Category</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {isLoadingCategories ? (
              <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            ) : (
              <FlatList
                data={['All Categories', ...(categories || [])]}
                keyExtractor={(item) => item}
                renderItem={renderCategoryItem}
                style={styles.list}
              />
            )}
            <View style={styles.footer}>
              <Button title="Done" onPress={onClose} color="#007AFF" />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeAreaContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.7,
  },
  modalContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
  },
  loader: {
    marginVertical: 20,
  },
  list: {},
  categoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#e0f3ff',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default FilterModal;
