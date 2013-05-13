/**
 * 0xor1    https://github.com/0xor1
 * Date:    20/04/2013
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        , rs
        ;

    ns.rs = {};
    rs = ns.rs;

    //Misc
    rs._ = '_';
    rs.prfx = rs._ + NS + rs._;
    rs.classPrfx = NS.toLowerCase() + '-';

    //Layout
    rs.layoutRoot = prfx('layout-root');
    rs.rootRegion = prfx('region-root');
    rs.floatingRegionAnchor = prfx('floating-region-anchor');
    rs.dialogBoxAnchor = prfx('dialog-box-anchor');
    rs.floatingRegionTabBar = prfx('floating-region-tab-bar');

    //Regions
    rs.flexiRegion = prfx('flexi-region');

    //GroupableRegion
    rs.splittableRegion = prfx('splittable-region');
    rs.verticalSplitRegion = prfx('vertical-split-region');
    rs.horizontalSplitRegion = prfx('horizontal-split-region');
    rs.splitChunk = prfx('split-chunk');
    rs.splitter = prfx('splitter');

    //TabbableRegion
    rs.tabbableRegion = prfx('tabbable-region');
    rs.tabStrip = prfx('tab-stip');
    rs.tab = prfx('tab');

    //ContentRegion
    rs.contentRegion = prfx('content-region');
    rs.contentHeader = prfx('content-header');
    rs.contentZone = prfx('content-zone');

    //FloatingRegion
    rs.floatingRegion = prfx('floating-region');
    rs.floatingRegionTab = prfx('floating-region-tab');

    function prfx(className){
        return rs.classPrfx + className;
    }

})(NS);