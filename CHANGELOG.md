# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-01-15

### Removed
- **Breaking Change**: Removed `totalCount` and `totalPage` from `ListData` and `InternalState` interfaces
- **Breaking Change**: Removed `canLoadMoreItems` prop - functionality is now handled entirely by `needLoadMore` flag
- **Breaking Change**: Removed unused `parentParams` parameter from `refresh` method
- Simplified pagination logic to rely only on `needLoadMore` flag for determining if more data should be loaded

### Changed
- Updated load more logic to use only `needLoadMore` flag instead of calculating based on total counts or custom functions
- Simplified API surface by removing redundant pagination controls
- Streamlined refresh method signature by removing unused parameters

## [1.0.0] - 2024-01-15

### Added
- Initial release of React Native Advanced FlatList
- Pagination support with automatic loading
- Pull-to-refresh functionality
- Single selection mode
- Custom rendering support
- Loading indicators
- Empty state management
- TypeScript support with full type definitions
- Comprehensive API with imperative methods
- Example implementation
- Full documentation with usage examples

### Features
- **Pagination**: Automatic page loading with customizable page size
- **Refresh Control**: Built-in pull-to-refresh with loading states
- **Selection**: Single item selection with change callbacks
- **Customization**: Custom render functions for items and empty states
- **Loading States**: Built-in loading indicators for better UX
- **TypeScript**: Complete type safety with exported interfaces
- **Performance**: Optimized with React.memo and useCallback
- **Flexibility**: Extensive props for customization and control

### Technical Details
- Built with React Native FlatList as the core component
- Uses React hooks for state management
- forwardRef for imperative API access
- Memoized components for performance optimization
- Comprehensive TypeScript definitions
- Zero external dependencies (except peer dependencies)

### Documentation
- Complete README with installation and usage
- API reference with all props and methods
- Multiple usage examples
- TypeScript interface documentation
- Changelog for version tracking 