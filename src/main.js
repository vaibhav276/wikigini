require.config({
    paths: {
        'marked': 'https://cdn.jsdelivr.net/npm/marked@4.2.2/lib/marked.umd.min',
        'd3': 'https://d3js.org/d3.v7.min'
    }
})


require(['marked', 'd3'], function(marked, d3) {
    fetch('../config.json')
        .then(response => response.json())
        .then(config => {
            // Set title
            const title =  (config && config.title) || "Home";
            document.title = title;
            d3.select('#home-title').html(title);

            // Set navigation menu
            let listItems = d3.select('#navbarSupportedContent')
            .append('ul')
            .attr('class', 'navbar-nav me-auto mb-2 mb-lg-0');
            const navigation = (config && config.navigation) || {}
            for (key in navigation) {
                listItems.append('li')
                .attr('class', 'nav-item')
                .append('a')
                .attr('class', 'nav-link active')
                .attr('href', navigation[key])
                .text(key);
            }
        });

    const home = '../content/home.md';

    renderMarkdownPage(home);

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
});