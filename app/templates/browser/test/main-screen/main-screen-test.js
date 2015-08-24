chai.should();

describe('<main-screen>', function () {
    it('should inherit PageBehavior', function () {
        var mainScreen = document.querySelector('main-screen');
        mainScreen.should.have.property('pages').with.length(3);
    });

    it('should template navigation items from PageBehavior', function () {
        var mainScreen = document.querySelector('main-screen');
        var pages = mainScreen.pages;

        var navigationItems = mainScreen.querySelectorAll('.navItem');
        for (var i = 0; i < pages.length; i++) {
            navigationItems[i].querySelector('span').innerText.should.equal(pages[i].title);
        }
    });

    it('should set hash to "#/home" on first navigation', function (done) {
        if (window.location.hash === '') {
            window.addEventListener('hashchange', function () {
                window.location.hash.should.equal('#/home');

                done();
            });
        }
        else {
            window.location.hash.should.equal('#/home');
            done();
        }
    });

    it('should select Home navigation item on first navigation', function () {
        var mainScreen = document.querySelector('main-screen');
        var pages = mainScreen.pages;

        var navigationItems = mainScreen.querySelectorAll('.navItem');
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].title === 'Home') {
                navigationItems[i].classList.should.match(/iron-selected/);
            }
            else {
                navigationItems[i].classList.should.not.match(/iron-selected/);
            }
        }
    });
});
