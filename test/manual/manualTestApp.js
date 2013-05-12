/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 30/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {};


    function manualTestApp(){

        var appLayout = new ns.Layout();

        var region = new ns.FlexiRegion();
        var tmpRegion = new ns.FlexiRegion();
        var parent = region.group(new ns.FlexiRegion(), 1, 'horizontal');
        parent = parent.group(tmpRegion, 1, 'vertical');
        region.group(new ns.FlexiRegion(), 0, 'vertical');
        region.getRoot().group(new ns.FlexiRegion(), 0, 'horizontal');
        appLayout.embedRegion(region.getRoot());

        setTimeout(function(){tmpRegion.ungroup();}, 5000);

    }


    window.addEventListener('load', manualTestApp, false);


})(NS);