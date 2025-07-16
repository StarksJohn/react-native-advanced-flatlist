import React, { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AdvancedFlatList } from '../src';
import type { 
  AdvancedFlatListRef, 
  FetchDataParams, 
  ListData,
  ListItem,
  RenderItemParams 
} from '../src';

// Example data item interface
interface ExampleItem extends ListItem {
  title: string;
  description: string;
  category: string;
}

const BasicExample = () => {
  const flatListRef = useRef<AdvancedFlatListRef>(null);

  // Mock data for demonstration
  const generateMockData = (pageIndex: number, pageSize: number): ExampleItem[] => {
    const startIndex = pageIndex * pageSize;
    return Array.from({ length: pageSize }, (_, index) => ({
      id: startIndex + index + 1,
      title: `Item ${startIndex + index + 1}`,
      description: `This is the description for item ${startIndex + index + 1}`,
      category: ['Technology', 'Science', 'Business', 'Sports'][Math.floor(Math.random() * 4)]
    }));
  };

  // Fetch data function - simulates API call
  const fetchData = useCallback(async ({ pageIndex, pageSize }: FetchDataParams): Promise<ListData | null> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const items = generateMockData(pageIndex, pageSize);
      const totalCount = 100; // Mock total count for demo purposes
      const totalPages = Math.ceil(totalCount / pageSize);
      
      return {
        items,
        pageIndex,
        needLoadMore: pageIndex < totalPages - 1
      };
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  }, []);

  // Custom render item
  const renderItem = useCallback(({ item, index, selected, onItemPress }: RenderItemParams) => {
    const exampleItem = item as ExampleItem;
    return (
      <TouchableOpacity
        onPress={() => onItemPress?.(item, index)}
        style={{
          padding: 16,
          backgroundColor: selected ? '#e3f2fd' : 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          marginHorizontal: 16,
          marginVertical: 4,
          borderRadius: 8,
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
          {exampleItem.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          {exampleItem.description}
        </Text>
        <Text style={{ 
          fontSize: 12, 
          color: '#999', 
          marginTop: 8,
          backgroundColor: '#f0f0f0',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 4,
          alignSelf: 'flex-start'
        }}>
          {exampleItem.category}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  // Handle selection change
  const handleSelectionChange = useCallback((selectedItem: ListItem | null) => {
    if (selectedItem) {
      Alert.alert('Item Selected', `You selected: ${(selectedItem as ExampleItem).title}`);
    }
  }, []);

  // Control buttons
  const renderControls = () => (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      padding: 16,
      backgroundColor: '#f5f5f5'
    }}>
      <TouchableOpacity
        onPress={() => flatListRef.current?.refresh()}
        style={{
          backgroundColor: '#2196F3',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Refresh</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => flatListRef.current?.scrollToTop()}
        style={{
          backgroundColor: '#4CAF50',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Scroll to Top</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => flatListRef.current?.clearSelection()}
        style={{
          backgroundColor: '#FF9800',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Clear Selection</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      {renderControls()}
      <AdvancedFlatList
        ref={flatListRef}
        fetchData={fetchData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        singleSelect={true}
        onSingleSelectChange={handleSelectionChange}
        autoRefresh={true}
        pageSize={10}
        emptyText="No items found"
        showListEmptyComponent={true}
        style={{ backgroundColor: 'transparent' }}
        flatListBoxStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
};

export default BasicExample; 