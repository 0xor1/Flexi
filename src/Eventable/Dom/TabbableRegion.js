/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 27/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', class: rs.tabbableRegion, style: { },
            children: [

            ]
        }
        ;

    ns.TabbableRegion = function(content){

        ns.Dom.call(this, domInfo);

        this.
    };

    ns.TabbableRegion.prototype = Object.create(ns.Dom.prototype);

})(NS);