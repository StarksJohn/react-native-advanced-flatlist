// Basic React types
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
  
  namespace React {
    type FC<P = {}> = FunctionComponent<P>;
    type ReactNode = string | number | boolean | ReactElement | ReactFragment | ReactPortal | null | undefined;
    type ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> = any;
    type ReactFragment = {} | Iterable<ReactNode>;
    type ReactPortal = any;
    type JSXElementConstructor<P> = any;
    
    interface FunctionComponent<P = {}> {
      (props: P, context?: any): ReactElement<any, any> | null;
      propTypes?: any;
      contextTypes?: any;
      defaultProps?: Partial<P>;
      displayName?: string;
    }
    
    type ComponentType<P = {}> = FunctionComponent<P> | Component<P, any>;
    
    function forwardRef<T, P = {}>(
      render: (props: P, ref: any) => ReactElement | null
    ): any;
    
    function memo<P extends object>(
      Component: FunctionComponent<P>,
      propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
    ): any;
    
    function useCallback<T extends (...args: any[]) => any>(
      callback: T,
      deps: any[]
    ): T;
    
    function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    function useImperativeHandle<T>(ref: any, createHandle: () => T, deps?: any[]): void;
    function useMemo<T>(factory: () => T, deps: any[]): T;
    function useRef<T>(initialValue: T): { current: T };
    function useRef<T = undefined>(): { current: T | undefined };
    function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
    
    interface Component<P = {}, S = {}> {
      render(): ReactNode;
    }
  }
}

// Basic React Native types
declare module 'react-native' {
  export interface StyleProp<T> {
    [key: string]: any;
  }
  
  export interface ViewStyle {
    [key: string]: any;
  }
  
  export interface ListRenderItem<ItemT> {
    (info: { item: ItemT; index: number }): React.ReactElement | null;
  }
  
  export interface FlatListProps<ItemT> {
    data?: ReadonlyArray<ItemT> | null;
    renderItem?: ListRenderItem<ItemT> | null;
    keyExtractor?: (item: ItemT, index: number) => string;
    onRefresh?: (() => void) | null;
    refreshing?: boolean | null;
    onEndReached?: ((info: { distanceFromEnd: number }) => void) | null;
    onEndReachedThreshold?: number | null;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
    ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
    onScrollBeginDrag?: (event: any) => void;
    onScrollEndDrag?: (event: any) => void;
    showsVerticalScrollIndicator?: boolean;
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
    contentContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement | null;
    scrollToOffset?: (params: { offset: number; animated?: boolean }) => void;
  }
  
  export class FlatList<ItemT> extends React.Component<FlatListProps<ItemT>> {
    scrollToOffset(params: { offset: number; animated?: boolean }): void;
  }
  
  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }
  
  export class View extends React.Component<ViewProps> {}
  
  export interface TouchableOpacityProps extends ViewProps {
    onPress?: () => void;
  }
  
  export class TouchableOpacity extends React.Component<TouchableOpacityProps> {}
  
  export interface TextProps {
    style?: StyleProp<any>;
    children?: React.ReactNode;
  }
  
  export class Text extends React.Component<TextProps> {}
  
  export interface ActivityIndicatorProps {
    size?: 'small' | 'large' | number;
    color?: string;
  }
  
  export class ActivityIndicator extends React.Component<ActivityIndicatorProps> {}
  
  export interface RefreshControlProps {
    refreshing: boolean;
    onRefresh?: () => void;
  }
  
  export class RefreshControl extends React.Component<RefreshControlProps> {}
  
  export interface StyleSheetStatic {
    create<T extends any>(styles: T): T;
  }
  
  export const StyleSheet: StyleSheetStatic;
} 