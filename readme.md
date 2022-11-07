# Wikigini

A lightweight wiki generator that uses markdown files as database and 100% client side rendering.

## How to use
1. Put `index.html`, `config.json` and `src/main.js` in your root location
2. In root directory, create a directory called `content/` to put all your markdown files in.
3. Modify `config.json` to include your navigation links and other settings. Remember to always put `#!content/` before all your links in `config.json` and also in your markdown files to link to your other files.
4. Serve your root directory in a static web server