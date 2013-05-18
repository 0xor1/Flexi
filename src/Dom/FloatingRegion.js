/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 04/05/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        ;


    ns.FloatingRegion = function(pairableRegion){

        ns.Dom.call(this,{
            class: 'floating-region', style: { }
        });
    };


    ns.FloatingRegion.prototype = Object.create(ns.Dom.prototype);


})(NS);