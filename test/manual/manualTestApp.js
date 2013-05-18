/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 30/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {};


    function manualTestApp(){

        var appLayout = new ns.Layout();
        var dCons = [
            new ns.DummyControl(),
            new ns.DummyControl(),
            new ns.DummyControl(),
            new ns.DummyControl(),
            new ns.DummyControl()
        ];
        var region = new ns.FlexiRegion(dCons[0], 0);
        var tmpRegion = new ns.FlexiRegion(dCons[1], 1);
        var parent = region.pair(new ns.FlexiRegion(dCons[2], 2), 1, 'horizontal');
        parent = parent.pair(tmpRegion, 1, 'vertical');
        region.pair(new ns.FlexiRegion(dCons[3], 3), 0, 'vertical');
        region.getRoot().pair(new ns.FlexiRegion(dCons[4], 4), 0, 'horizontal');
        appLayout.embedRegion(region.getRoot());
        appLayout.render();
    }


    window.addEventListener('load', manualTestApp, false);


})(NS);