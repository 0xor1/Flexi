/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 27/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    //TODO replace with actual implementation
    ns.TabbableRegion = function(content){

        ns.Dom.call(this, {
            tag: 'div', class: 'tabbable-region', style: {position:'absolute', background:'hsl('+Math.random()*359+',20%,50%)', border: '4px solid green', width:'calc(100% - 8px)', height:'calc(100% - 8px)'}
        });


    };


    ns.TabbableRegion.prototype = Object.create(ns.Dom.prototype);


})(NS);