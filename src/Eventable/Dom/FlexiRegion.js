/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 26/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', class: rs.flexiRegion, style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'hidden', background: ns.Layout.coreStyle.background }}
        ;

    // purely a wrapper to setup new regions and provide a unified interface, it offers no additional
    // functionality to the sub regions it contains, other than to consolidate them into a single object.
    // FlexiRegions are only used for leaf nodes, they ONLY contain NON-SPLIT SplittableRegions.
    ns.FlexiRegion = function(content){

        ns.SplittableRegion.call(this,
            new ns.TabbableRegion(content)
        );

    };


    ns.FlexiRegion.prototype = Object.create(ns.SplittableRegion.prototype);


})(NS);