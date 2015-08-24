chai.should();

describe('<fancy-material>', function () {
    it('should place h1 in #top', function () {
        var fancyMaterial = document.querySelector('fancy-material');
        var h1 = fancyMaterial.querySelector('h1');
        h1.parentNode.id.should.equal('top');
    });

    it('should place all other elements in #content', function () {
        var fancyMaterial = document.querySelector('fancy-material');
        var p = fancyMaterial.querySelector('p');
        p.parentNode.id.should.equal('content');
    });
});
