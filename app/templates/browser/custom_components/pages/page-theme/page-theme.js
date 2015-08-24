Polymer({
    is: 'page-theme',

    /* Lifecycle Callbacks: https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html
     * Note that the order that all elements are ready may not be reliable.
     * If order is important, access sibling elements within the attached method,
     * using this.async(function).
     */
    //created: function () {},
    //ready: function () {},
    //attached: function () {},

    /* https://www.polymer-project.org/1.0/docs/devguide/behaviors.html */
    //behaviors: [],

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
        headers: {
            type: Array,
            value: [
                'Dessert',
                'Calories',
                'Fat (g)',
                'Carbs (g)',
                'Protein (g)'
            ],
            readOnly: true
        },
        foods: {
            type: Object,
            value: [
                {
                    name: 'Ice Cream Sandwich',
                    calories: '237',
                    fat: '9.0',
                    carbs: '37',
                    protein: '4.3'
                },
                {
                    name: 'Jelly Bean',
                    calories: '375',
                    fat: '0.0',
                    carbs: '94',
                    protein: '0.0'
                },
                {
                    name: 'Kit Kat',
                    calories: '518',
                    fat: '26.0',
                    carbs: '65',
                    protein: '7'
                },
                {
                    name: 'Lollipop',
                    calories: '392',
                    fat: '0.2',
                    carbs: '98',
                    protein: '0'
                }
            ],
            readOnly: true
        },
        verticalData: {
            type: Object,
            value: [
                { header: 'Dessert', value: 'A 100g serving of Lollipops!' },
                { header: 'Calories', value: '392 (0.02% GDA [2000kCal])' },
                { header: 'Fat (g)', value: '0.2 (0.28% GDA [70g])' },
                { header: 'Carbs (g)', value: '98 (37.69% GDA [260g]' },
                { header: 'Protein (g)', value: '0 (0% GDA [50g]' }
            ],
            readOnly: true
        }
    }

    /* Functions specific to this element go under here. */
});
