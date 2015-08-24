/* globals ___browserSync___ */
(function () {
    function injectCustomComponentStyle(data) {
        var element = data.element;
        var style = data.style;

        // Find the style tag for the element in the shadyDOM.
        var styleTag = document.querySelectorAll('style[scope="' + element + '"]')[0];

        if (styleTag) {
            // Replace content.
            styleTag.innerHTML = style;
            console.log(element + ' style injected.');
        }
    }

    window.addEventListener('load', function () {
        // As the script may run before BrowserSync is ready, set an interval
        //  until the BrowserSync script has been run.
        var handle = window.setInterval(function () {
            if (___browserSync___) {
                // Listen for 'custom-component-css' event fired by server side.
                ___browserSync___.socket.on('custom-component-css', injectCustomComponentStyle);

                clearInterval(handle);
            }
        }, 10000);
    });
})();
