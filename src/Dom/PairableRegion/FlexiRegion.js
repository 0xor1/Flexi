/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 26/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    // purely a wrapper to setup new regions and provide a unified interface, it offers no additional
    // functionality to the sub regions it contains, other than to consolidate them into a single object.
    ns.FlexiRegion = function(content){

        ns.PairableRegion.call(this,
            new ns.TabbableRegion(content)
        );

    };


    ns.FlexiRegion.prototype = Object.create(ns.PairableRegion.prototype);


})(NS);