require.config({
    paths: {
        'marked': 'https://cdn.jsdelivr.net/npm/marked@4.2.2/lib/marked.umd.min',
        'd3': 'https://d3js.org/d3.v7.min'
    }
})

const home = 'content/index.md';

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

            window.onhashchange = locationHashChanged;
            locationHashChanged(); // To render deep link
        })
        .catch(err => console.error(err));

    function locationHashChanged() {
        if (location.hash.length > 0) {
            const url = location.hash.replace('#!', '');
            renderMarkdownPage(url);
        } else {
            renderMarkdownPage(home);
        }
    }

    function renderMarkdownPage(url, cb) {
        let breadcrumbs = url.split("/");
        let breadCrumbs = d3.select("#breadcrumbs").html('');
        if (breadcrumbs.length > 3) {
            breadcrumbs = breadcrumbs.slice(1, breadcrumbs.length - 1);

            breadCrumbs = breadCrumbs.append('nav')
                .attr('aria-label', 'breadcrumb')
                .append('ol')
                .attr('class', 'breadcrumb');

            const links = breadCrumbLinks(breadcrumbs);
            for (let i = 0; i < breadcrumbs.length - 1; i++) {
                breadCrumbs.append('li')
                    .attr('class', 'breadcrumb-item')
                    .append('a')
                    .attr('class', 'link')
                    .attr('href', links[i])
                    .text(breadcrumbs[i].replaceAll('_', ' '));
            }
            breadCrumbs.append('li')
                .attr('class', 'breadcrumb-item')
                .text(breadcrumbs[breadcrumbs.length - 1].replaceAll('_', ' '));
        } 
        fetch(url)
            .then(response => response.text())
            .then(data => {
                d3.select('#content').html(marked.parse(data));
                if (cb != undefined && cb != null) cb();
            })
            .catch(err => console.error(err));
    }

    function breadCrumbLinks(arr) {
        let link = '#!content/'
        let ret = [];
        for(let i = 0; i < arr.length; i++) {
            link = link + arr[i] + '/';
            ret.push(link + 'index.md');
        }
        return ret;
    }
});