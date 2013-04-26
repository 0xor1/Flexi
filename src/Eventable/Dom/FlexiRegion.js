/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 26/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', class: rs.flexiRegion, style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'hidden', background: ns.Layout.coreStyle.background }}
        ;

    // purely a wrapper to contain all of the sub regions and provide a unified interface, it offers no additional
    // functionality to the sub regions it contains, other than to consolidate them into a single object.
    ns.FlexiRegion = function(){

        ns.Dom.call(this, domInfo);

        this.splittableRegion = new ns.SplittableRegion();
        this.tabbableRegion = new ns.TabbableRegion();
        this.contentRegion = new ns.ContentRegion();
    };

    ns.FlexiRegion.prototype = Object.create(ns.Dom.prototype);

})(NS);