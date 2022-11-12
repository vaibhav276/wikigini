# Wikigini

A minimalistic wiki generator that uses markdown files as database and 100% client side rendering.

## How to use
1. Put `index.html`, `config.json` and `src/main.js` in your `${project_root}`.
2. In `${project_root}` directory, create a directory called `content/` to put all your markdown files in.
3. Put your home page in `content/index.md`.
4. Modify `config.json` to include your navigation links and other settings. Remember to always put `#!content/` before all your links in `config.json` and also in your markdown files to link to your other files.
5. Serve your root directory using any web server.

## Organizing your content
1. All your content should be inside the `${project_root}/content` folder
2. Home page will be `${project_root}/content/index.md`
3. Each folder should have it's own `index.md` file
4. Underscores (`_`) in folder names will be displayed as spaces in breadcrumbs

### Example
```
project_root
|--index.html
|--config.json
|--src
|   |--main.js
|--content
    |--index.md
    |--Section_1
    |   |--index.md
    |   |--Sub-section_1
    |   |   |--index.md
    |   |--Sub-section_2
    |       |--index.md
    |--Section_2
        |--index.md
        |--Sub-section_1
            |--Very
                |--index.md
                |--Deep
                    |--index.md
                    |--Sub-section
                        |--index.md
    
```

## Config.json

|Property | Description | Default value |Example|
|:---|:---|:---|:---|
|title|Title of your wiki|Home|My awesome wiki|
|navigation|Links for top navigation bar|`{}`|`{"Section1": "#!content/Section_1/index.md", "Section 2": "#!content/Section_2/index.md"}`|
|themeName|Theme name from https://bootswatch.com/|`null`|materia|
|themeStyle|Corresponding style for selected theme|primary|light|

## Example/Demo (this repo)
https://vaibhav276.github.io/wikigini/

## Credits
Inspired from [MDWiki](http://dynalon.github.io/mdwiki/#!index.md)
