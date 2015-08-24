chai.should();

describe('<routed-pages>', function () {
    it('should inherit PageBehavior', function () {
        var routedPages = document.querySelector('routed-pages');
        routedPages.should.have.property('pages').with.length(3);
    });

    it('should template page elements from PageBehavior', function () {
        var routedPages = document.querySelector('routed-pages');
        var pages = routedPages.pages;

        var pageElements = routedPages.querySelector('neon-animated-pages').childNodes;
        pageElements.length.should.equal(pages.length);

        for (var i = 0; i < pages.length; i++) {
            pageElements[i].nodeName.should.equal(pages[i].element.toUpperCase());
        }
    });

    it('should change selectedPage on page-changed event fired', function () {
        var routedPages = document.querySelector('routed-pages');
        (routedPages.selectedPages === undefined).should.equal(true);

        var detail = {
            tag: '/home',
            title: 'Home',
            element: 'page-home'
        };
        routedPages.fire('page-changed', detail);

        routedPages.selectedPage.should.equal('/home');
    });

    it('should fire toast-message event on failing to load the new page', function (done) {
        window.addEventListener('toast-message', function (event) {
            event.detail.message.should.match(/Failed to load the Fake page./);
            routedPages.selectedPage.should.equal('/home');

            done();
        });

        var routedPages = document.querySelector('routed-pages');
        var detail = {
            tag: '/fake-page',
            title: 'Fake',
            element: 'fake-page'
        };
        routedPages.fire('page-changed', detail);
    });
});
