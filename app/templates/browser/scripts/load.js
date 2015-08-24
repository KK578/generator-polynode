///////////////////////////////////
// Entry point.
// Handles loading of:
//  WebComponents
//  Splash Screen dependencies
(function () {
    // Delays to allow animation to play before initialising loading.
    var loadingDelay = 0;
    var splashCloseDelay = 0;
    var loadingElements = [
        'bower_components/font-roboto/roboto.html',
        'bower_components/paper-material/paper-material.html',
        'bower_components/paper-spinner/paper-spinner.html'
    ];

    function loadAppDependencies() {
        Polymer.Base.importHref('elements.html', function () {
            // Remove loading CSS from all elements.
            var loaders = document.querySelectorAll('.loading');
            for (var i = 0; i < loaders.length; i++) {
                loaders[i].classList.remove('loading');
            }

            // Stop spinner.
            document.querySelector('#splashSpinner').active = false;
            // Seam card into background
            document.querySelector('#splashCard').elevation = 0;

            // Delay to allow splashCard to hide.
            window.setTimeout(function () {
                document.querySelector('#splashScreen').runAnimation();
            }, splashCloseDelay);
        });
    }

    function startSplashScreen() {
        // Scale in paper-spinner.
        document.querySelector('#splashSpinner').classList.remove('start');
        // Animate card lifting up.
        document.querySelector('#splashCard').elevation = 5;

        // Defer loading for a small delay to allow animation to play.
        window.setTimeout(loadAppDependencies, loadingDelay);
    }

    function loadInitialDependencies() {
        var loadedInitialDependencies = 0;

        // Count Splash Screen dependencies.
        function finishLoading() {
            if (++loadedInitialDependencies >= loadingElements.length) {
                // Run async to ensure DOM has finished loading.
                window.setTimeout(startSplashScreen, 0);
            }
        }

        // For each splash screen dependency, load dependencies now that
        //  it is certain that WebComponents is available.
        for (var i = 0; i < loadingElements.length; i++) {
            var elementTag = document.createElement('link');
            elementTag.rel = 'import';
            elementTag.href = loadingElements[i];
            elementTag.onload = finishLoading;
            document.head.appendChild(elementTag);
        }
    }

    function checkNativeWebComponents() {
        var nativeWebComponents = 'registerElement' in document &&
                'import' in document.createElement('link') &&
                'content' in document.createElement('template');

        // Native support, can start loading immediately.
        if (nativeWebComponents) {
            loadInitialDependencies();
        }
        // Otherwise append WebComponents import.
        else {
            var webComponentsTag = document.createElement('script');
            webComponentsTag.src = 'bower_components/webcomponentsjs/webcomponents-lite.js';
            webComponentsTag.onload = loadInitialDependencies;
            document.head.appendChild(webComponentsTag);
        }
    }

    /////////////////////////////////////////////
    // Code execution
    /////////////////
    // Test for natively supported WebComponents.
    checkNativeWebComponents();
})();
