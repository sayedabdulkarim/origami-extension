const vscode = require('vscode');

/**
 * Origami - Smart Code Folding Extension
 * Main extension class that handles all folding logic
 */
class OrigamiExtension {
    constructor() {
        this.foldStates = new Map(); // Store fold state per file path
        this.statusBarItem = null;
        this.config = null;
    }

    /**
     * Activate the extension
     * @param {vscode.ExtensionContext} context 
     */
    activate(context) {
        console.log('Origami extension is now active!');
        
        // Load configuration
        this.loadConfiguration();
        
        // Create and setup status bar item if enabled
        if (this.config.showStatusBar) {
            this.createStatusBarItem(context);
        }

        // Register the main toggle command
        const toggleCommand = vscode.commands.registerCommand(
            'origami.toggle',
            () => this.toggleFold()
        );
        context.subscriptions.push(toggleCommand);

        // Listen to configuration changes
        const configChangeListener = vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('origami')) {
                this.loadConfiguration();
                this.updateStatusBarVisibility();
            }
        });
        context.subscriptions.push(configChangeListener);

        // Listen to active editor changes
        const editorChangeListener = vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                this.updateStatusBar(editor);
            }
        });
        context.subscriptions.push(editorChangeListener);

        // Listen to document close to clean up state
        const documentCloseListener = vscode.workspace.onDidCloseTextDocument((document) => {
            // Clean up fold state for closed documents
            this.foldStates.delete(document.fileName);
        });
        context.subscriptions.push(documentCloseListener);

        // Initialize status bar for current editor
        if (vscode.window.activeTextEditor) {
            this.updateStatusBar(vscode.window.activeTextEditor);
        }
    }

    /**
     * Load extension configuration
     */
    loadConfiguration() {
        const config = vscode.workspace.getConfiguration('origami');
        this.config = {
            rememberState: config.get('rememberState', true),
            showStatusBar: config.get('showStatusBar', true),
            statusBarAlignment: config.get('statusBarAlignment', 'right'),
            statusBarPriority: config.get('statusBarPriority', 100)
        };
    }

    /**
     * Create status bar item
     * @param {vscode.ExtensionContext} context 
     */
    createStatusBarItem(context) {
        const alignment = this.config.statusBarAlignment === 'left' 
            ? vscode.StatusBarAlignment.Left 
            : vscode.StatusBarAlignment.Right;
        
        this.statusBarItem = vscode.window.createStatusBarItem(
            alignment,
            this.config.statusBarPriority
        );
        
        this.statusBarItem.command = 'origami.toggle';
        this.statusBarItem.show();
        context.subscriptions.push(this.statusBarItem);
    }

    /**
     * Update status bar visibility based on configuration
     */
    updateStatusBarVisibility() {
        if (this.statusBarItem) {
            if (this.config.showStatusBar) {
                this.statusBarItem.show();
            } else {
                this.statusBarItem.hide();
            }
        }
    }

    /**
     * Main toggle function - folds or unfolds all code
     */
    async toggleFold() {
        console.log('=== Origami: Toggle called ===');
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            console.warn('Origami: No active editor found');
            vscode.window.showInformationMessage('No active editor found');
            return;
        }

        const document = editor.document;
        const fileName = document.fileName;
        console.log(`Origami: File - ${fileName.split('/').pop()}`);
        
        // Get current fold state (default to 'expanded' if not set)
        const currentState = this.config.rememberState 
            ? (this.foldStates.get(fileName) || 'expanded')
            : 'expanded';
        console.log(`Origami: Current state - ${currentState}`);
        
        try {
            if (currentState === 'expanded') {
                console.log('Origami: Folding all code...');
                // Fold all code
                await this.foldAll(editor, document);
                
                if (this.config.rememberState) {
                    this.foldStates.set(fileName, 'folded');
                }
                
                console.log('Origami: Successfully folded');
                // Show subtle notification
                vscode.window.setStatusBarMessage('$(fold) Code folded', 2000);
            } else {
                console.log('Origami: Unfolding all code...');
                // Unfold all code
                await this.unfoldAll(editor);
                
                if (this.config.rememberState) {
                    this.foldStates.set(fileName, 'expanded');
                }
                
                console.log('Origami: Successfully unfolded');
                // Show subtle notification
                vscode.window.setStatusBarMessage('$(unfold) Code expanded', 2000);
            }
            
            // Update status bar
            this.updateStatusBar(editor);
            
        } catch (error) {
            console.error('Error toggling fold:', error);
            vscode.window.showErrorMessage('Failed to toggle fold');
        }
    }

    /**
     * Fold all code blocks based on file type
     * @param {vscode.TextEditor} editor 
     * @param {vscode.TextDocument} document 
     */
    async foldAll(editor, document) {
        const fileType = this.detectFileType(document);
        
        console.log(`Origami: Detected file type - ${fileType}`);
        
        // Apply different folding strategies based on file type
        switch (fileType) {
            case 'react':
            case 'javascript':
            case 'typescript':
                // For JS/TS files - fold all functions, classes, objects
                await vscode.commands.executeCommand('editor.foldAll');
                break;
                
            case 'test':
                // For test files - fold all test blocks
                await vscode.commands.executeCommand('editor.foldAll');
                break;
                
            case 'json':
                // For JSON - fold to show structure (level 1)
                await vscode.commands.executeCommand('editor.foldLevel1');
                break;
                
            case 'css':
            case 'scss':
            case 'less':
                // For CSS - fold all rule blocks
                await vscode.commands.executeCommand('editor.foldAll');
                break;
                
            case 'html':
            case 'xml':
                // For HTML/XML - fold to level 2 to show main structure
                await vscode.commands.executeCommand('editor.foldLevel2');
                break;
                
            case 'python':
                // For Python - fold all functions and classes
                await vscode.commands.executeCommand('editor.foldAll');
                break;
                
            case 'markdown':
                // For Markdown - fold sections
                await vscode.commands.executeCommand('editor.foldLevel1');
                break;
                
            default:
                // Generic folding for all other file types
                await vscode.commands.executeCommand('editor.foldAll');
        }
    }

    /**
     * Unfold all code blocks
     * @param {vscode.TextEditor} editor 
     */
    async unfoldAll(editor) {
        await vscode.commands.executeCommand('editor.unfoldAll');
    }

    /**
     * Detect file type based on language and filename
     * @param {vscode.TextDocument} document 
     * @returns {string} File type identifier
     */
    detectFileType(document) {
        const fileName = document.fileName.toLowerCase();
        const languageId = document.languageId;
        
        // Check for test files
        if (fileName.includes('.test.') || 
            fileName.includes('.spec.') || 
            fileName.includes('test/') || 
            fileName.includes('tests/') ||
            fileName.includes('__tests__')) {
            return 'test';
        }
        
        // Check for React files
        if ((fileName.endsWith('.jsx') || fileName.endsWith('.tsx')) ||
            (languageId === 'javascriptreact' || languageId === 'typescriptreact')) {
            return 'react';
        }
        
        // Language-specific detection
        switch (languageId) {
            case 'javascript':
                return 'javascript';
            case 'typescript':
                return 'typescript';
            case 'json':
            case 'jsonc':
                return 'json';
            case 'css':
                return 'css';
            case 'scss':
            case 'sass':
                return 'scss';
            case 'less':
                return 'less';
            case 'html':
                return 'html';
            case 'xml':
                return 'xml';
            case 'python':
                return 'python';
            case 'markdown':
                return 'markdown';
            case 'yaml':
            case 'yml':
                return 'yaml';
            default:
                return 'default';
        }
    }

    /**
     * Update status bar with current fold state
     * @param {vscode.TextEditor} editor 
     */
    updateStatusBar(editor) {
        if (!this.statusBarItem) {
            return;
        }

        const fileName = editor.document.fileName;
        const state = this.config.rememberState 
            ? (this.foldStates.get(fileName) || 'expanded')
            : 'expanded';
        
        if (state === 'folded') {
            this.statusBarItem.text = '$(chevron-right) Folded';
            this.statusBarItem.tooltip = 'Click to expand all code (Alt+Z / Option+Z)';
            this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        } else {
            this.statusBarItem.text = '$(chevron-down) Expanded';
            this.statusBarItem.tooltip = 'Click to fold all code (Alt+Z / Option+Z)';
            this.statusBarItem.backgroundColor = undefined;
        }
    }

    /**
     * Deactivate the extension
     */
    deactivate() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
        this.foldStates.clear();
        console.log('Origami extension deactivated');
    }
}

// Create a single instance of the extension
const origamiExtension = new OrigamiExtension();

/**
 * This method is called when the extension is activated
 * @param {vscode.ExtensionContext} context 
 */
function activate(context) {
    origamiExtension.activate(context);
}

/**
 * This method is called when the extension is deactivated
 */
function deactivate() {
    origamiExtension.deactivate();
}

module.exports = {
    activate,
    deactivate
};