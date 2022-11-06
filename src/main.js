require.config({
    paths: {
        'marked': 'https://cdn.jsdelivr.net/npm/marked@4.2.2/lib/marked.umd.min',
        'd3': 'https://d3js.org/d3.v7.min',
        'd3-fetch': 'https://d3js.org/d3-fetch.v1.min',
        'd3-dsv': 'https://cdn.jsdelivr.net/npm/d3-dsv@3.0.1/dist/d3-dsv.min'
    }
})


require(['marked', 'd3', 'd3-dsv', 'd3-fetch'], function(marked, d3, d3dsv, d3fetch) {
    fetch('../config.json')
        .then(response => response.json())
        .then(config => {
            const title =  (config && config.title) || "Home";
            document.title = title;
            d3.select('#home-title').html(title);
        });

    const home = '../pages/index.md';
    let tree = {};

    renderMarkdownPage(home);

    d3fetch.html('../pages')
        .then(function(data) {
            console.log('Files');
            [].map.call(data.querySelectorAll("a.icon-text"), el => {
                console.log(el);
            });
            console.log('Directories');
            [].map.call(data.querySelectorAll("a.icon-directory"), el => {
                console.log(el);
            });
        });

    function locationHashChanged() {
        if (location.hash.length > 0) {
            const url = location.hash.replace('#!', '../');
            renderMarkdownPage(url);
        } else {
            renderMarkdownPage(home);
        }
    }
      
    window.onhashchange = locationHashChanged;

    function renderMarkdownPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                d3.select('#content').html(marked.parse(data));
            })
            .catch(err => console.error(err));
    }

    function parseDirectoryStructure(homeLocation) {
        fetch(homeLocation)
            .then(response => response.text())
            .then(data => {
                console.log(data);
            });
    }
});