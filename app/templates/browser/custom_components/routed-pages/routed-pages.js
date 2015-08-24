/* globals Behaviors */
Polymer({
    is: 'routed-pages',

    /* Lifecycle Callbacks: https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
     * Note that the order that all elements are ready may not be reliable.
     * If order is important, access sibling elements within the attached method,
     * using this.async(function).
     */
    //created: function () {},
    ready: function () {
        this.setupPages();
        this.attachListeners();
    },
    //attached: function () {},

    /* https://www.polymer-project.org/1.0/docs/devguide/behaviors.html */
    behaviors: [Behaviors.PageBehavior],

    /* https://www.polymer-project.org/1.0/docs/devguide/events.html#event-listeners */
    //listeners: {},

    /**
     * https://www.polymer-project.org/1.0/docs/devguide/properties.html
     *
     * Notes:
     *  type {constructor}
     *  value {boolean, number, string, function}
     *  reflectToAttribute {boolean}
     *  readOnly {boolean}
     *  notify {boolean}
     *  computed {string}
     *  observer {string}
     */
    properties: {
        selectedPage: {
            type: String,
            observer: 'pageChanged'
        }
    },

    /* Functions specific to this element go under here. */
    // Element setup - Ready functions.
    setupPages: function () {
        // Find the neon-animated-pages element.
        var pages = this.$.pages;

        // For each page in the pages array, create it's element, set the route
        // attribute and attach to the neon-animated-pages.
        for (var i = 0; i < this.pages.length; i++) {
            var page = this.pages[i];
            var element = document.createElement(page.element);
            element.setAttribute('route', page.tag);

            Polymer.dom(pages).appendChild(element);
        }
    },
    attachListeners: function () {
        // Main-Screen event indicating a page change occuring.
        window.addEventListener('page-changed', this.handlePageChange.bind(this));
    },
    handlePageChange: function (event) {
        function importLoaded(newPage) {
            this.selectedPage = newPage;
        }

        function importError(newPage) {
            if (history.replaceState) {
                history.replaceState(null, null, '#' + this.selectedPage);
            }
            else {
                // Fallback method if history.replaceState is not implemented.
                window.location.hash = '#' + this.selectedPage;
            }

            // HACK: Informs main-screen of the forced hash change.
            // This is required as this the hash change does not appear to be detected due to
            // it being added via history.replaceState, which is used to prevent the invalid
            // hash state due to the failed import.
            this.fire('hashchange');

            this.fire('toast-message', {
                message: 'Failed to load the ' + newPage + ' page.\n' +
                    'Please check your internet connection and refresh.'
            });
        }

        var page = event.detail;
        var element = page.element;

        // Check whether the element has been imported yet before switching the page.
        if (!document.createElement(element).$) {
            var elementHref = 'custom_components/pages/' + element + '/' + element + '.html';

            Polymer.Base.importHref(elementHref, importLoaded.bind(this, page.tag),
                importError.bind(this, page.title));
        }
        else {
            this.selectedPage = page.tag;
        }
    },
    // Observers
    // selectedPage
    pageChanged: function () {
        function scrollToTop(element, start, duration) {
            if (duration > 400) {
                element.scrollTop = 0;
                return;
            }

            setTimeout(function () {
                var tick = duration / 400.0;
                var perTick = Math.pow(tick, 0.333);
                element.scrollTop = start * (1 - perTick);

                if (element.scrollTop <= 0) {
                    element.scrollTop = 0;
                    return;
                }

                scrollToTop(element, start, duration + 10);
            }, 10);
        }

        var pages = this.$.pages;
        scrollToTop(pages, pages.scrollTop, 0);
    }
});
