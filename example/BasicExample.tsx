import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Switch, StyleSheet } from 'react-native';
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
  
  // Demo configuration state
  const [config, setConfig] = useState({
    singleSelect: true,
    autoRefresh: true,
    disabledRefresh: false,
    showListEmptyComponent: true,
    pageSize: 10,
    initPageIndex: 0,
    keyboardShouldPersistTaps: 'never' as const,
    showHeader: true,
    useCustomEmpty: false
  });

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

  // Initial data for demonstration
  const initialData: Partial<ListData> = {
    items: generateMockData(0, 5),
    pageIndex: 0,
    needLoadMore: true
  };

  // Fetch data function - simulates API call
  const fetchData = useCallback(async ({ pageIndex, pageSize }: FetchDataParams): Promise<ListData | null> => {
    try {
      console.log(`Fetching data for page ${pageIndex} with size ${pageSize}`);
      
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

  // Custom render item with all features
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
          {exampleItem.title} {selected && '✓'}
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
          {exampleItem.category} (Index: {index})
        </Text>
      </TouchableOpacity>
    );
  }, []);

  // Custom list header component
  const ListHeaderComponent = () => config.showHeader ? (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Advanced FlatList Demo</Text>
      <Text style={styles.headerSubtext}>
        Showcasing all features: pagination, refresh, selection, events
      </Text>
    </View>
  ) : null;

  // Custom empty component
  const CustomEmptyComponent = () => (
    <View style={styles.customEmptyContainer}>
      <Text style={styles.customEmptyText}>🔍</Text>
      <Text style={styles.customEmptyTitle}>Custom Empty State</Text>
      <Text style={styles.customEmptyDescription}>
        This is a custom empty component showing when no data is available
      </Text>
    </View>
  );

  // Event handlers
  const handleSelectionChange = useCallback((selectedItem: ListItem | null) => {
    if (selectedItem) {
      Alert.alert(
        'Selection Changed', 
        `Selected: ${(selectedItem as ExampleItem).title}\nID: ${selectedItem.id}`
      );
    } else {
      Alert.alert('Selection Cleared', 'No item is currently selected');
    }
  }, []);

  const handleItemPress = useCallback((item: ListItem, index: number) => {
    console.log(`Item pressed: ${(item as ExampleItem).title} at index ${index}`);
    Alert.alert(
      'Item Pressed', 
      `Pressed: ${(item as ExampleItem).title}\nIndex: ${index}\nID: ${item.id}`
    );
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    console.log('Scroll began');
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    console.log('Scroll ended');
  }, []);

  // Reference methods demo
  const testRefMethods = () => {
    Alert.alert(
      'Reference Methods',
      'Choose an action:',
      [
        { text: 'Get Items Count', onPress: () => {
          const items = flatListRef.current?.getItems() || [];
          Alert.alert('Items Count', `Total items: ${items.length}`);
        }},
        { text: 'Change Item Selection (Index 2)', onPress: () => {
          flatListRef.current?.changeItemSelect(2);
        }},
        { text: 'Stop Refresh', onPress: () => {
          flatListRef.current?.stopRefresh();
        }},
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  // Configuration panel
  const renderConfigPanel = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.configPanel}
      contentContainerStyle={styles.configContent}
    >
      <View style={styles.configItem}>
        <Text style={styles.configLabel}>Single Select</Text>
        <Switch
          value={config.singleSelect}
          onValueChange={(value) => setConfig(prev => ({...prev, singleSelect: value}))}
        />
      </View>
      
      <View style={styles.configItem}>
        <Text style={styles.configLabel}>Auto Refresh</Text>
        <Switch
          value={config.autoRefresh}
          onValueChange={(value) => setConfig(prev => ({...prev, autoRefresh: value}))}
        />
      </View>
      
      <View style={styles.configItem}>
        <Text style={styles.configLabel}>Disable Refresh</Text>
        <Switch
          value={config.disabledRefresh}
          onValueChange={(value) => setConfig(prev => ({...prev, disabledRefresh: value}))}
        />
      </View>
      
      <View style={styles.configItem}>
        <Text style={styles.configLabel}>Show Header</Text>
        <Switch
          value={config.showHeader}
          onValueChange={(value) => setConfig(prev => ({...prev, showHeader: value}))}
        />
      </View>
      
      <View style={styles.configItem}>
        <Text style={styles.configLabel}>Custom Empty</Text>
        <Switch
          value={config.useCustomEmpty}
          onValueChange={(value) => setConfig(prev => ({...prev, useCustomEmpty: value}))}
        />
      </View>
    </ScrollView>
  );

  // Control buttons
  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        onPress={() => flatListRef.current?.refresh()}
        style={[styles.controlButton, { backgroundColor: '#2196F3' }]}
      >
        <Text style={styles.controlButtonText}>Refresh</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => flatListRef.current?.scrollToTop()}
        style={[styles.controlButton, { backgroundColor: '#4CAF50' }]}
      >
        <Text style={styles.controlButtonText}>Scroll Top</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => flatListRef.current?.clearSelection()}
        style={[styles.controlButton, { backgroundColor: '#FF9800' }]}
      >
        <Text style={styles.controlButtonText}>Clear</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={testRefMethods}
        style={[styles.controlButton, { backgroundColor: '#9C27B0' }]}
      >
        <Text style={styles.controlButtonText}>Ref Methods</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderConfigPanel()}
      {renderControls()}
      
      <AdvancedFlatList
        // Component identification
        tag="advanced-demo"
        
        // Reference
        ref={flatListRef}
        
        // Initial data and pagination
        initialData={config.autoRefresh ? undefined : initialData}
        initPageIndex={config.initPageIndex}
        pageSize={config.pageSize}
        
        // Data fetching
        fetchData={fetchData}
        
        // Render functions
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        
        // Styling
        style={styles.flatListStyle}
        
        // Components
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={config.useCustomEmpty ? CustomEmptyComponent : undefined}
        
        // Behavior
        autoRefresh={config.autoRefresh}
        disabledRefresh={config.disabledRefresh}
        keyboardShouldPersistTaps={config.keyboardShouldPersistTaps}
        
        // Empty state
        emptyText="No items found - try refreshing"
        showListEmptyComponent={config.showListEmptyComponent}
        
        // Events
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        
        // Selection
        singleSelect={config.singleSelect}
        onSingleSelectChange={handleSelectionChange}
        onItemPress={handleItemPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  configPanel: {
    backgroundColor: '#e8f5e8',
    maxHeight: 80
  },
  configContent: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  configItem: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 80
  },
  configLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center'
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#f5f5f5'
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 70
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },
  flatListStyle: {
    backgroundColor: 'transparent',
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#2196F3',
    padding: 20,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  headerSubtext: {
    fontSize: 14,
    color: '#e3f2fd',
    textAlign: 'center',
    marginTop: 4
  },
  customEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  customEmptyText: {
    fontSize: 48,
    marginBottom: 16
  },
  customEmptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  customEmptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20
  }
});

export default BasicExample;