import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  ListRenderItem,
  RefreshControl,
  Text,
} from 'react-native';
import {createStyles} from './styles';

// Base list item interface
export interface ListItem {
  id: string | number;
  selected?: boolean;

  [key: string]: any;
}

// API response data interface
export interface ListData {
  items: ListItem[];
  pageIndex?: number;
  needLoadMore?: boolean;
}

// Fetch data function parameters
export interface FetchDataParams {
  pageIndex: number;
  pageSize: number;
}

// Render item parameters
export interface RenderItemParams {
  item: ListItem;
  index: number;
  selected?: boolean;
  onItemPress?: (item: ListItem, index: number) => void;
}

// Component props interface
export interface AdvancedFlatListProps {
  // Component identification
  tag?: string;

  // Initial data and pagination
  initialData?: Partial<ListData>;
  initPageIndex?: number;
  pageSize?: number;

  // Data fetching
  fetchData: (params: FetchDataParams) => Promise<ListData | null>;

  // Render functions
  renderItem?: (params: RenderItemParams) => React.ReactNode;
  keyExtractor?: (item: ListItem, index: number) => string;

  // Styling
  style?: StyleProp<ViewStyle>;

  // Components
  ListHeaderComponent?: ReactNode;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement<unknown> | null | undefined;

  // Behavior
  autoRefresh?: boolean;
  disabledRefresh?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | undefined;

  // Empty state
  emptyText?: string;
  showListEmptyComponent?: boolean;

  // Events
  onScrollBeginDrag?: (event: any) => void;
  onScrollEndDrag?: (event: any) => void;

  // Selection
  singleSelect?: boolean;
  onSingleSelectChange?: (selectedItem: ListItem | null) => void;
  onItemPress?: (item: ListItem, index: number) => void;
}

// Component ref interface
export interface AdvancedFlatListRef {
  scrollToTop: () => void;
  refresh: () => void;
  stopRefresh: () => void;
  getItems: () => ListItem[];
  changeItemSelect: (index: number) => void;
  clearSelection: () => void;
}

// Internal state interface
export interface InternalState {
  items: ListItem[];
  pageIndex: number;
  loading: boolean;
  refreshing: boolean;
  needLoadMore: boolean;
  selectedId: string | number | null;
}

// Default empty component
const DefaultEmptyComponent: React.FC<{ text: string }> = ({text}) => {
  const styles = createStyles();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
};

// Default list item component
const DefaultListItem: React.FC<RenderItemParams> = memo((props: RenderItemParams) => {
  const {item, onItemPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onItemPress && onItemPress(item, 0)}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white'
      }}
    >
      <Text>{JSON.stringify(item)}</Text>
    </TouchableOpacity>
  );
});

/**
 * Advanced FlatList component with pagination, refresh, and selection support
 * Supports pull-to-refresh, infinite loading, single selection, and custom rendering
 */
const AdvancedFlatList = forwardRef<AdvancedFlatListRef, AdvancedFlatListProps>(
  function AdvancedFlatList(props, ref) {
    const {
      tag = 'advanced',
      initPageIndex = 0,
      initialData = {},
      pageSize = 20,
      fetchData,
      renderItem,
      style = {},
      ListHeaderComponent,
      ListEmptyComponent,
      autoRefresh = true,
      keyExtractor = (item: ListItem, index: number) => String(item.id),
      disabledRefresh = false,
      emptyText = 'No data available',
      showListEmptyComponent = true,
      onScrollBeginDrag,
      onScrollEndDrag,
      keyboardShouldPersistTaps = 'never',
      singleSelect = false,
      onSingleSelectChange,
      onItemPress,
    } = props;

    // State management
    const [state, setState] = useState<InternalState>({
      items: [],
      pageIndex: initPageIndex,
      loading: false,
      refreshing: false,
      needLoadMore: false,
      selectedId: null,
      ...initialData,
    });

    // Refs
    const flatListRef = useRef<FlatList<ListItem>>(null);
    const refreshingRef = useRef(false);
    const styles = useMemo(() => createStyles(), []);

    // Component lifecycle
    useEffect(() => {
      console.log('AdvancedFlatList componentDidMount');

      // Special scroll behavior on mount (from common-flatList)
      flatListRef.current?.scrollToOffset({offset: -100, animated: true});

      // Auto refresh if enabled
      if (autoRefresh) {
        console.log('AdvancedFlatList auto refresh starting');
        onRefresh();
      }

      // Cleanup
      return () => {
        console.log('AdvancedFlatList componentWillUnmount');
      };
    }, [autoRefresh]);

    // Imperative handle for parent component access
    useImperativeHandle(
      ref,
      () => ({
        scrollToTop: () => {
          console.log('AdvancedFlatList scrollToTop');
          flatListRef.current?.scrollToOffset({animated: true, offset: 0});
        },
        refresh: onRefresh,
        stopRefresh: () => {
          setState(prev => ({...prev, refreshing: false}));
          refreshingRef.current = false;
        },
        getItems: () => {
          console.log('AdvancedFlatList getItems', state.items);
          return state.items;
        },
        changeItemSelect: (index: number) => {
          console.log('AdvancedFlatList changeItemSelect index=', index);
          setState(prev => ({
            ...prev,
            items: prev.items.map((item, idx) =>
              idx === index ? {...item, selected: !item.selected} : item
            ),
          }));
        },
        clearSelection: () => setState(prev => ({...prev, selectedId: null})),
      }),
      [state.items]
    );

    // Refresh handler
    const onRefresh = useCallback(() => {
      console.log('AdvancedFlatList onRefresh refreshingRef.current=', refreshingRef.current);
      if (!refreshingRef.current) {
        setState(prev => ({...prev, needLoadMore: false}));
        fetchDataInternal('refresh');
      }
    }, []);

    // Internal fetch data function
    const fetchDataInternal = useCallback(
      async (type: 'refresh' | 'loadMore') => {
        console.log('AdvancedFlatList fetchDataInternal type=', type);
        const pageIndex = type === 'refresh' ? initPageIndex : state.pageIndex + 1;

        if (type === 'refresh') {
          refreshingRef.current = true;
          setState(prev => ({...prev, refreshing: true, pageIndex, loading: false}));
        } else {
          setState(prev => ({...prev, loading: true, refreshing: false, pageIndex}));
        }

        try {
          console.log('AdvancedFlatList preparing to fetchData');
          const result = await fetchData({
            pageIndex,
            pageSize,
          });

          refreshingRef.current = false;
          console.log('AdvancedFlatList fetchData result=', result);

          if (result) {
            setState(prev => {
              console.log('AdvancedFlatList fetchData prev.loading=', prev.loading);
              console.log('AdvancedFlatList fetchData result.items.length=', result.items?.length);
              console.log('AdvancedFlatList fetchData result.needLoadMore=', result.needLoadMore);

              const items = prev.loading ? [...prev.items, ...result.items] : result.items;
              return {
                ...prev,
                ...result,
                items,
                loading: false,
                refreshing: false,
                pageIndex,
              };
            });
          } else {
            setState(prev => ({
              ...prev,
              items: type === 'refresh' ? [] : prev.items,
              loading: false,
              refreshing: false,
              needLoadMore: false,
            }));
          }
        } catch (error) {
          console.error('AdvancedFlatList fetch data error:', error);
          refreshingRef.current = false;
          setState(prev => ({
            ...prev,
            loading: false,
            refreshing: false,
            needLoadMore: false,
          }));
        }
      },
      [state.items, state.pageIndex, fetchData, initPageIndex, pageSize]
    );

    // Load more handler
    const loadMoreItems = useCallback(async () => {
      if (state.items.length === 0) {
        return false;
      }

      const shouldLoadMore = !state.loading &&
        state.needLoadMore;

      if (shouldLoadMore) {
        await fetchDataInternal('loadMore');
      } else {
        setState(prevState => ({
          ...prevState,
          needLoadMore: false
        }));
      }
    }, [state, fetchDataInternal]);

    // Single select handler
    const handleItemPress = useCallback(
      (item: ListItem, index: number) => {
        // Call external onItemPress first
        if (onItemPress) {
          onItemPress(item, index);
        }

        // Handle single selection
        if (singleSelect) {
          const itemId = keyExtractor(item, index);
          setState(prev => {
            const newSelected = prev.selectedId === itemId ? null : itemId;
            if (onSingleSelectChange) {
              onSingleSelectChange(newSelected === null ? null : item);
            }
            return {...prev, selectedId: newSelected};
          });
        }
      },
      [singleSelect, keyExtractor, onSingleSelectChange, onItemPress]
    );

    // Render footer
    const renderFooter = useCallback(() => {
      if (!state.loading) return null;
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      );
    }, [state.loading, styles.loader]);

    // Render item wrapper
    const renderItemWrapper: ListRenderItem<ListItem> = useCallback(
      ({item, index}) => {
        const selected = singleSelect ? state.selectedId === keyExtractor(item, index) : !!item.selected;

        if (renderItem) {
          return renderItem({item, index, selected, onItemPress: handleItemPress});
        }

        return <DefaultListItem item={item} index={index} onItemPress={handleItemPress} />;
      },
      [renderItem, singleSelect, state.selectedId, keyExtractor, handleItemPress]
    );

    // Render empty component
    const renderEmptyComponent = useCallback(() => {
      if (!showListEmptyComponent || refreshingRef.current || state.refreshing) {
        return null;
      }
      return ListEmptyComponent || <DefaultEmptyComponent text={emptyText} />;
    }, [showListEmptyComponent, state.refreshing, ListEmptyComponent, emptyText]);

    return (
      <FlatList<ListItem>
        {...(tag && { key: tag })}
        ref={flatListRef}
        style={[
          styles.flatList,
          style,
        ]}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={ListHeaderComponent}
        data={state.items}
        renderItem={renderItemWrapper}
        keyExtractor={keyExtractor}
        refreshControl={
          !disabledRefresh ? (
            <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      />
    );
  }
);

export default memo(AdvancedFlatList);
