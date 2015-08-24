Polymer({
    is: 'splash-screen',

    /* Lifecycle Callbacks: https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
     * Note that the order that all elements are ready may not be reliable.
     * If order is important, access sibling elements within the attached method,
     * using this.async(function).
     */
    //created: function () {},
    //ready: function () {},
    //attached: function () {},

    /* https://www.polymer-project.org/1.0/docs/devguide/behaviors.html */
    behaviors: [Polymer.NeonAnimationRunnerBehavior],

    /* https://www.polymer-project.org/1.0/docs/devguide/events.html#event-listeners */
    listeners: {
        'neon-animation-finish': 'onAnimationFinished'
    },

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
        animationConfig: {
            type: Object,
            value: function () {
                var config = [
                    {
                        name: 'slide-up-animation',
                        node: this,
                        timing: { easing: 'ease-in' }
                    },
                    {
                        name: 'scale-down-animation',
                        node: this
                    }
                ];

                return config;
            }
        }
    },

    /* Functions specific to this element go under here. */
    runAnimation: function () {
        this.playAnimation();
    },
    onAnimationFinished: function () {
        // After the exit animation has played, remove the splash-screen element
        // from the DOM.
        Polymer.dom(this.parentNode).removeChild(this);
    }
});
