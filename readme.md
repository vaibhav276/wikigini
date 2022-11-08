# Wikigini

A minimalistic wiki generator that uses markdown files as database and 100% client side rendering.

## How to use
1. Put `index.html`, `config.json` and `src/main.js` in your root location
2. In root directory, create a directory called `content/` to put all your markdown files in.
3. Put your home page in `content/home.md`. All your content should be kept under this directory.
4. Modify `config.json` to include your navigation links and other settings. Remember to always put `#!content/` before all your links in `config.json` and also in your markdown files to link to your other files.
5. Serve your root directory using any web server

### Config.json
|Property | Description |
|:---|:---|
|title|Title of your wiki|
|navigation|Links for top navigation bar|
|themeName|Theme name from https://bootswatch.com/|
|themeStyle|Corresponding style for selected theme|

## Credits
Inspired from [MDWiki](http://dynalon.github.io/mdwiki/#!index.md)