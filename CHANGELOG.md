# Change Log

All notable changes to the "Origami" extension will be documented in this file.

## [Unreleased]

## [0.0.2] - 2024-09-29

### Added
- Screenshots in README showing before/after folding demonstration
- Light version of icon for better visibility
- Images folder with demonstration screenshots

### Fixed
- Icon visibility in dark theme sidebar

## [0.0.1] - 2024-09-27

### Initial Release 🎌

#### Added
- **Core Functionality**
  - Toggle between folded and expanded states with a single command
  - Fold all nested structures including functions, objects, and arrays
  - Universal support for all programming languages
  
- **Smart File Detection**
  - React/JSX/TSX files - Folds component bodies
  - Test files - Folds test implementations
  - JSON files - Folds to show structure
  - CSS/SCSS - Folds rule blocks
  - HTML/XML - Folds nested elements
  - Python - Folds functions and classes
  - Markdown - Folds sections
  - Default fallback for all other file types

- **User Interface**
  - Status bar indicator showing current fold state (Folded/Expanded)
  - Keyboard shortcut: `Alt+Z` (Windows/Linux) or `Option+Z` (Mac)
  - Command palette integration: "Origami: Toggle Fold/Unfold All"
  - Context menu option in editor
  - Editor title bar button

- **Configuration Options**
  - `origami.rememberState` - Remember fold state per file during session
  - `origami.showStatusBar` - Toggle status bar visibility
  - `origami.statusBarAlignment` - Choose left or right alignment
  - `origami.statusBarPriority` - Set status bar item priority

- **Session Management**
  - Remembers fold state for each file during the current session
  - Automatic cleanup when files are closed
  - State resets on VS Code restart (by design)

#### Technical Details
- Built with VS Code Extension API
- Zero dependencies for optimal performance
- Supports VS Code version 1.74.0 and above
- Clean, maintainable codebase with comprehensive documentation

---

*Fold your code like art with Origami* 🎌