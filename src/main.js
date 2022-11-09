require.config({
    paths: {
        'marked': 'https://cdn.jsdelivr.net/npm/marked@4.2.2/lib/marked.umd.min',
        'd3': 'https://d3js.org/d3.v7.min'
    }
})

const home = 'content/home.md';

require(['marked', 'd3'], function(marked, d3) {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Set title
            const title =  (config && config.title) || 'Home';
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
                .attr('class', 'nav-link')
                .attr('href', navigation[key])
                .text(key);
            }

            // Add theme
            const themeName = (config && config.themeName) || null;
            let themePath = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css';
            if (themeName) {
                themePath = 'https://cdn.jsdelivr.net/npm/bootswatch@5.2.2/dist/' + themeName + '/bootstrap.min.css';
            }
            let styleElement = document.createElement('link');
            styleElement.setAttribute('rel', 'stylesheet');
            styleElement.setAttribute('type', 'text/css');
            styleElement.setAttribute('href', themePath);
            styleElement.setAttribute('crossorigin', 'anonymous');
            document.getElementsByTagName('head')[0].appendChild(styleElement);
            let themeStyle = (config && config.themeStyle) || 'primary';
            d3.select('#navbar')
                .classed('navbar-' + (themeStyle === 'primary' ? 'dark' : themeStyle), true)
                .classed('bg-' + themeStyle , true);

            renderMarkdownPage(home, function() {
                window.onhashchange = locationHashChanged;
            });
        });

    function locationHashChanged() {
        if (location.hash.length > 0) {
            const url = location.hash.replace('#!', '');
            renderMarkdownPage(url);
        } else {
            renderMarkdownPage(home);
        }
    }

    function renderMarkdownPage(url, cb) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                d3.select('#content').html(marked.parse(data));
                if (cb != undefined && cb != null) cb();
            })
            .catch(err => console.error(err));
    }
});