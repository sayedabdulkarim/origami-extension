# 🎌 Origami - Smart Code Folding for VS Code

> Fold your code like art. A VS Code extension that intelligently toggles code folding with a single command.

## ✨ Features

- **🔄 Single Toggle**: One command to fold all / unfold all
- **📁 Universal Support**: Works with all programming languages
- **🎯 Smart Patterns**: Different folding strategies for different file types
- **💾 State Memory**: Remembers fold state per file during your session
- **🎨 Status Bar**: Visual indicator showing current fold state
- **⌨️ Keyboard Shortcut**: Quick access with `Alt+Z` (Windows/Linux) or `Option+Z` (Mac)

## 🚀 Installation

### From VS Code Marketplace (Coming Soon)

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install origami-vscode`
4. Press Enter

### From Source (Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/origami-vscode.git
cd origami-vscode

# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to run in development mode
```

## 📖 Usage

### Toggle Folding

- **Keyboard**: Press `Alt+Z` (Windows/Linux) or `Option+Z` (Mac)
- **Status Bar**: Click the fold indicator in the status bar
- **Command Palette**: Press `Ctrl+Shift+P` and type "Origami: Toggle"
- **Context Menu**: Right-click in editor and select "Toggle Smart Fold"

### How It Works

1. **Open any file** - Code is displayed normally (expanded)
2. **Press `Alt+Z`** - All code blocks fold, showing only the structure
3. **Press `Alt+Z` again** - Everything expands back to normal

### Smart File Patterns

Origami recognizes different file types and applies appropriate folding:

- **React Components** (`.jsx`, `.tsx`) - Folds all component bodies
- **Test Files** (`*.test.js`, `*.spec.ts`) - Folds test implementations
- **JSON Files** - Folds nested objects to show structure
- **CSS/SCSS** - Folds rule blocks
- **HTML** - Folds nested elements
- **Default** - Folds all code blocks

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14 or higher)
- VS Code (v1.74.0 or higher)
- npm or yarn

### Project Structure

```
origami-vscode/
├── extension.js        # Main extension code
├── package.json        # Extension manifest
├── README.md          # Documentation
├── .vscodeignore      # Files to exclude from package
├── .gitignore         # Git ignore rules
├── icon.png           # Extension icon
└── test/
    └── suite/         # Test files
```

### Development Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Package extension
npm run package

# Publish to marketplace
npm run publish
```

### Testing Locally

1. Open the project in VS Code
2. Press `F5` to launch a new VS Code window with the extension loaded
   - **Important**: A new VS Code window titled "[Extension Development Host]" will open
   - This is the test environment where your extension is active
   - The original window is for editing code, the new window is for testing
3. Open any code file in the new test window (not the original window)
4. Test the folding toggle with `Alt+Z` (Windows/Linux) or `Option+Z` (Mac)
5. Look for the fold indicator in the status bar (bottom-right)

## ⚙️ Configuration

Access settings through VS Code Settings or add to your `settings.json`:

```json
{
  // Remember fold state for each file
  "origami.rememberState": true,

  // Show fold indicator in status bar
  "origami.showStatusBar": true
}
```

## 🎯 Features Breakdown

### Core Functionality

- ✅ Toggle between folded/expanded state
- ✅ Fold all nested structures
- ✅ Support all file types
- ✅ Remember state per file

### User Interface

- ✅ Status bar indicator with current state
- ✅ Keyboard shortcut (Alt+Z)
- ✅ Command palette integration
- ✅ Context menu option

### Smart Features

- ✅ File type detection
- ✅ Different patterns for different languages
- ✅ Session-based state persistence

## 🐛 Known Issues

- Fold state resets when VS Code restarts (by design - session only)
- Very large files (>10,000 lines) may have slight delay

## 📝 Changelog

### Version 0.0.1 (Initial Release)

- Basic fold/unfold toggle
- Status bar integration
- Keyboard shortcuts
- File type detection
- State persistence per session

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the art of origami - transforming complex forms into simple, elegant shapes
- Thanks to the VS Code team for the excellent extension API
- Icon credit: [Origami icon source]

## 💡 Future Enhancements

- [ ] Persistent fold state across VS Code sessions
- [ ] Custom fold patterns per project
- [ ] Fold level selection (1, 2, 3... levels)
- [ ] Auto-fold on file open (configurable)
- [ ] Fold statistics in status bar
- [ ] Export/import fold preferences

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/origami-vscode/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/origami-vscode/discussions)
- **Email**: sakarim9124@gmail.com

---

**Made with ❤️ by Sayed Abdul Karim**

_Fold your code like art with Origami_ 🎌
