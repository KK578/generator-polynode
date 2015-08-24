/* globals Behaviors */
Polymer({
    is: 'main-screen',

    /* Lifecycle Callbacks: https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
     * Note that the order that all elements are ready may not be reliable.
     * If order is important, access sibling elements within the attached method,
     * using this.async(function).
     */
    //created: function () {},
    ready: function () {
        this.attachListeners();
    },
    attached: function () {
        this.setInitialPage();
    },

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
            type: Number,
            notify: true
        }
    },

    /* Functions specific to this element go under here. */
    // Element setup - Ready functions.
    attachListeners: function () {
        window.addEventListener('page-changed', this.checkPage.bind(this));
        window.addEventListener('hashchange', this.checkHash.bind(this));
    },
    checkPage: function (event) {
        this.selectedPage = event.detail.index;
    },
    checkHash: function () {
        var hashRoute = window.location.hash.split('#')[1];
        var index = 0;
        var page;

        // Validate the hashRoute is in the pages.
        do {
            if (hashRoute === this.pages[index].tag) {
                page = this.pages[index];
                break;
            }
        }
        while (++index < this.pages.length);

        this.handlePageChange(index, page);
    },
    handlePageChange: function (index, page) {
        if (page) {
            // Page is valid and located within the pages array.
            // If this is not the current page, inform all listening elements of this event
            // via the page-changed event.
            if (this.selectedPage !== page.tag) {
                var detail = {
                    index: index,
                    tag: page.tag,
                    title: page.title,
                    element: page.element
                };
                this.fire('page-changed', detail);
            }
        }
        else {
            // Otherwise the hashRoute is now invalid, so attempt to remove the invalid
            // state and replace with the home page.
            if (history.replaceState) {
                history.replaceState(null, null, '#/home');
            }
            else {
                // Fallback method if history.replaceState is not implemented.
                window.location.hash = '/home';
            }

            this.checkHash();
        }
    },
    // Element setup - Attached functions
    setInitialPage: function () {
        var hash = window.location.hash.split('#')[1];
        window.location.hash = hash ? hash : '/home';
        this.checkHash();
    },
    // Menu Drawer Item Tap Event Listener
    changePage: function (e) {
        // Normalise the event for Polymer DOM.
        var event = Polymer.dom(e).event;
        // Find the original object from the pages array used to create the item and
        // find the matching tag for the route.
        var hash = event.model.item.tag;
        window.location.hash = hash;

        // Close the drawer
        this.$.drawerContainer.closeDrawer();
    },
    // Service Worker
    displaySwToast: function () {
        this.fire('toast-message', {
            message: 'This app has been successfully cached!\n' +
                'It will now work while offline!'
        });
    }
});
