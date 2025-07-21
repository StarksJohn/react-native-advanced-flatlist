# React Native Advanced FlatList  https://github.com/StarksJohn/react-native-advanced-flatlist

A powerful React Native FlatList component that provides advanced features including pagination, pull-to-refresh, single selection, loading states, and more.

## Features

- ✅ **Pagination Loading** - Support for automatic pagination and infinite scrolling
- ✅ **Pull-to-Refresh** - Built-in pull-to-refresh control
- ✅ **Single Selection** - Support for single item selection functionality
- ✅ **Loading States** - Built-in loading indicators
- ✅ **Empty State** - Customizable empty list display
- ✅ **TypeScript** - Complete TypeScript type support
- ✅ **Flexible Rendering** - Support for custom list item rendering
- ✅ **Event Handling** - Rich scroll and click event handling

## Installation

```bash
npm install react-native-advanced-flatlist
# or
yarn add react-native-advanced-flatlist
```

## Basic Usage

```tsx
import React, {useCallback, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  AdvancedFlatList,
  AdvancedFlatListRef,
  FetchDataParams,
  ListData,
  ListItem,
  RenderItemParams
} from 'react-native-advanced-flatlist';

interface MyItem extends ListItem {
  title: string;
  description: string;
}

const MyComponent = () => {
  const flatListRef = useRef<AdvancedFlatListRef>(null);

  // Fetch data function
  const fetchData = useCallback(async ({pageIndex, pageSize}: FetchDataParams): Promise<ListData | null> => {
    try {
      // Replace with your API call
      const response = await fetch(`/api/items?page=${pageIndex}&size=${pageSize}`);
      const data = await response.json();

      return {
        items: data.items,
        pageIndex: pageIndex,
        needLoadMore: data.hasMore
      };
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  }, []);

  // Custom render item
  const renderItem = useCallback(({item, index, selected, onItemPress}: RenderItemParams) => {
    const myItem = item as MyItem;
    return (
      <TouchableOpacity
        onPress={() => onItemPress?.(item, index)}
        style={{
          padding: 15,
          backgroundColor: selected ? '#e3f2fd' : 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#eee'
        }}
      >
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{myItem.title}</Text>
        <Text style={{fontSize: 14, color: '#666'}}>{myItem.description}</Text>
      </TouchableOpacity>
    );
  }, []);

  // Handle selection change
  const handleSelectionChange = useCallback((selectedItem: ListItem | null) => {
    console.log('Selected item:', selectedItem);
  }, []);

  return (
    <View style={{flex: 1}}>
      <AdvancedFlatList
        ref={flatListRef}
        fetchData={fetchData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        singleSelect={true}
        onSingleSelectChange={handleSelectionChange}
        autoRefresh={true}
        pageSize={20}
        emptyText="No items found"
        showListEmptyComponent={true}
      />
    </View>
  );
};

export default MyComponent;
```

## Advanced Usage

### With Custom Empty Component

```tsx
const CustomEmptyComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Custom empty state</Text>
  </View>
);

<AdvancedFlatList
  fetchData={fetchData}
  renderItem={renderItem}
  ListEmptyComponent={CustomEmptyComponent}
  showListEmptyComponent={true}
/>
```

### With Header Component

```tsx
const HeaderComponent = () => (
  <View style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My List Header</Text>
  </View>
);

<AdvancedFlatList
  fetchData={fetchData}
  renderItem={renderItem}
  ListHeaderComponent={HeaderComponent}
/>
```

### Programmatic Control

```tsx
const flatListRef = useRef<AdvancedFlatListRef>(null);

// Refresh the list
const handleRefresh = () => {
  flatListRef.current?.refresh();
};

// Scroll to top
const handleScrollToTop = () => {
  flatListRef.current?.scrollToTop();
};

// Get current items
const getCurrentItems = () => {
  const items = flatListRef.current?.getItems();
  console.log('Current items:', items);
};

// Clear selection
const clearSelection = () => {
  flatListRef.current?.clearSelection();
};
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fetchData` | `(params: FetchDataParams) => Promise<ListData \| null>` | **Required** | Function to fetch list data |
| `renderItem` | `(params: RenderItemParams) => React.ReactNode` | `undefined` | Custom render function for list items |
| `keyExtractor` | `(item: ListItem) => string \| number` | `(item) => item.id` | Function to extract unique keys |
| `initialData` | `Partial<ListData>` | `{}` | Initial data for the list |
| `initPageIndex` | `number` | `0` | Initial page index |
| `pageSize` | `number` | `20` | Number of items per page |
| `autoRefresh` | `boolean` | `true` | Whether to auto-refresh on mount |
| `disabledRefresh` | `boolean` | `false` | Whether to disable pull-to-refresh |
| `singleSelect` | `boolean` | `false` | Enable single selection mode |
| `onSingleSelectChange` | `(item: ListItem \| null) => void` | `undefined` | Callback for selection changes |
| `onItemPress` | `(item: ListItem, index: number) => void` | `undefined` | Callback for item press |
| `emptyText` | `string` | `'No data available'` | Text to show when list is empty |
| `showListEmptyComponent` | `boolean` | `true` | Whether to show empty component |
| `ListEmptyComponent` | `React.ComponentType \| React.ReactElement` | `undefined` | Custom empty component |
| `ListHeaderComponent` | `ReactNode` | `undefined` | Header component |
| `style` | `StyleProp<ViewStyle>` | `{}` | Style for FlatList |
| `flatListBoxStyle` | `StyleProp<ViewStyle>` | `{}` | Style for container |
| `keyboardShouldPersistTaps` | `'always' \| 'never' \| 'handled'` | `'never'` | Keyboard handling |
| `onScrollBeginDrag` | `(event: any) => void` | `undefined` | Scroll begin callback |
| `onScrollEndDrag` | `(event: any) => void` | `undefined` | Scroll end callback |

### Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `refresh` | `(parentParams?: object) => void` | Manually trigger refresh |
| `scrollToTop` | `() => void` | Scroll to top of list |
| `stopRefresh` | `() => void` | Stop refresh indicator |
| `getItems` | `() => ListItem[]` | Get current list items |
| `changeItemSelect` | `(index: number) => void` | Toggle item selection |
| `clearSelection` | `() => void` | Clear current selection |

### Interfaces

#### `ListItem`
```tsx
interface ListItem {
  id: string | number;
  selected?: boolean;
  [key: string]: any;
}
```

#### `ListData`
```tsx
interface ListData {
  items: ListItem[];
  pageIndex?: number;
  needLoadMore?: boolean;
}
```

#### `FetchDataParams`
```tsx
interface FetchDataParams {
  pageIndex: number;
  pageSize: number;
  prevItems?: ListItem[];
}
```

#### `RenderItemParams`
```tsx
interface RenderItemParams {
  item: ListItem;
  index: number;
  selected?: boolean;
  onItemPress?: (item: ListItem, index: number) => void;
}
```

## License

MIT

## Contributing

Pull Requests and Issues are welcome!

## Changelog

### 1.0.0
- Initial release
- Support for pagination loading, pull-to-refresh, single selection and other core features 
