/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 26/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    // purely a wrapper to setup new regions and provide a unified interface, it offers no additional
    // functionality to the sub regions it contains, other than to consolidate them into a single object for the user
    ns.FlexiRegion = function(domControl, name, icon){

        this.control = new ns.ControlWrapper(domControl, name, icon);
        ns.PairableRegion.call(this,
            new ns.ContentRegion(
                this.control
            )
        );


    };


    ns.FlexiRegion.prototype = Object.create(ns.PairableRegion.prototype);


})(NS);