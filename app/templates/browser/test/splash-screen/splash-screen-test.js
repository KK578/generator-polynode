chai.should();

describe('<splash-screen>', function () {
    it('should contain inner elements', function () {
        var splashScreen = document.querySelector('splash-screen');
        splashScreen.innerHTML.should.match(/<h1>Loading...<\/h1>/);
    });

    it('should remove itself from document after running animation', function (done) {
        var splashScreen = document.querySelector('splash-screen');
        splashScreen.runAnimation();

        splashScreen.addEventListener('neon-animation-finish', function () {
            splashScreen = document.querySelector('splash-screen');

            var result = splashScreen === null ?
                undefined :
                new Error('splash-screen element did not delete.');

            done(result);
        }, 1000);
    });
});
