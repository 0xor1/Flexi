/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 30/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {};


    function manualTestApp(){

        var appLayout = new ns.Layout();

        region = new ns.FlexiRegion();
        region.addChild(new ns.FlexiRegion(), 1, 'horizontal');
        region.getRoot().addChild(new ns.FlexiRegion(), 1, 'vertical');
        region.addChild(new ns.FlexiRegion(), 0, 'vertical');
        appLayout.embedRegion(region.getRoot());

    }


    window.addEventListener('load', manualTestApp, false);


})(NS);