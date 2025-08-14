# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an advanced FlatList component library for React Native that provides pagination, pull-to-refresh, single selection, loading states, and other advanced features. The project is built with TypeScript and designed for npm publishing.

## Common Development Commands

```bash
# Build project - compile TypeScript source to lib/ directory
npm run build

# Watch mode build - automatically recompile on changes
npm run build:watch

# Clean build output
npm run clean

# Full rebuild (clean + build)
npm run prepare

# Check publish package contents
npm run publish:check

# Version publishing (patch/minor/major)
npm run publish:patch
npm run publish:minor  
npm run publish:major
```

## Code Architecture

### Core Component Structure
- `src/AdvancedFlatList.tsx` - Main advanced FlatList component providing pagination, refresh, selection features
- `src/common-flatList/` - Base implementation of common FlatList component
  - `common-flatList.tsx` - Base component implementation
  - `common-flatList.props.ts` - Component props definitions
  - `common-flatList.styles.ts` - Component styles
- `src/styles.ts` - Global style creation functions
- `src/index.ts` - Main library export file

### Type Definitions
The project uses comprehensive TypeScript type definitions:
- `ListItem` - Base list item interface with id and optional selected property
- `ListData` - API response data structure containing items array and pagination info
- `FetchDataParams` - Data fetching function parameters
- `RenderItemParams` - Custom render function parameters
- `AdvancedFlatListProps` - Main component props
- `AdvancedFlatListRef` - Component reference methods

### Build Configuration
- TypeScript compilation target: ES2017
- Output format: CommonJS
- Build output: `lib/` directory
- Type declaration files: Auto-generated `.d.ts` files

## Development Conventions

### Component Design Patterns
- Use `forwardRef` and `useImperativeHandle` to expose component methods
- Use `memo` for component performance optimization
- Use `useCallback` and `useMemo` to optimize re-renders
- Follow React hooks best practices

### Style Management
- Use `StyleSheet.create()` to create styles
- Support `StyleProp<ViewStyle>` type style properties
- Separate style files for better maintainability

### State Management
Components internally use React hooks to manage state:
- Pagination state (pageIndex, pageSize)
- Loading state (loading, refreshing)
- Data state (items, needLoadMore)
- Selection state (singleSelect, selectedItem)

## Publishing Process

Project is configured for automatic npm publishing:
1. Run `npm run clean && npm run build` to ensure clean build
2. Use `npm run publish:patch/minor/major` for automatic version control and publishing
3. Build output includes source code (`src/`) and compiled code (`lib/`)

## Testing and Development Workflow

The project currently has no automated testing configured. When developing new features:
- Use `example/BasicExample.tsx` as comprehensive test case demonstrating all features
- Manual verification checklist:
  - Pagination and infinite scrolling
  - Pull-to-refresh functionality
  - Single selection mode with visual feedback
  - Loading states and empty state handling
  - Custom header and empty components
  - Reference methods (refresh, scrollToTop, clearSelection, etc.)
- Always run `npm run build` to ensure TypeScript compilation is error-free
- Test with both initial data and dynamic data fetching

## Component Implementation Details

### Key Implementation Patterns
- Main component uses `forwardRef` with `useImperativeHandle` to expose control methods
- Internal state management handles pagination (pageIndex, pageSize), loading states, and selection
- Data fetching is async with error handling - returns `ListData | null`
- Single selection state is managed internally with optional callback notification
- Refresh control integrates with data fetching for pull-to-refresh behavior

### Important Type Constraints  
- All list items must extend `ListItem` interface with required `id` property
- FetchDataParams provides `pageIndex` and `pageSize` for pagination
- RenderItemParams includes `selected` state for custom item rendering
- Component uses minimal TypeScript config (strict: false) for broader compatibility