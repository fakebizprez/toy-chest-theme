# Welcome to Toy Chest Theme!

## What's in the folder

* This folder contains all of the files necessary for your color theme extension.
* `package.json` - this is the manifest file that defines the location of the theme file and specifies the base theme of the theme.
* `themes/toy-chest-color-theme.json` - the color theme definition file.

## Get up and running straight away

* Press `F5` to open a new window with your extension loaded.
* Open `File > Preferences > Color Themes` and pick your color theme.
* Open a file that has a language associated. The languages' configured grammar will tokenize the text and assign 'scopes' to the tokens. To examine these scopes, invoke the `Developer: Inspect Editor Tokens and Scopes` command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).

## Make changes

* Changes to the theme file are automatically applied to the Extension Development Host window.

## Adopt your theme to Visual Studio Code

* The token colorization is done based on standard TextMate themes. Colors are matched against one or more scopes.
  To learn more about scopes and how they're used, check out the [color theme](https://code.visualstudio.com/api/extension-guides/color-theme) documentation.

## Install your extension

* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
* To share your extension with the world, read about [publishing an extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Packaging your theme

* Install the VS Code Extension CLI: `npm install -g @vscode/vsce`
* Package your theme: `vsce package`
* This will create a `.vsix` file that you can install manually or publish to the marketplace.

## Testing in Cursor Editor

* The theme is fully compatible with Cursor Editor.
* Install the `.vsix` file in Cursor the same way you would in VS Code.
* Verify that all colors and UI elements display correctly.

## Customizing the Theme

Users can customize aspects of the theme in their `settings.json` file:

```json
{
  "workbench.colorCustomizations": {
    "[Toy Chest]": {
      "editor.background": "#1e2f40", // slightly darker background
      "statusBar.background": "#30cf7b" // brighter status bar
    }
  }
}
