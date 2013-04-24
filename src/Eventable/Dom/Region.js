/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    /**
     * Regions exists purely to hold content and to allow splitting into BiRegions
     */
    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = {
            tag: 'div',
            class: NS + "-region",
            style: {
                position: 'relative',
                height: '100%',
                width: '100%',
                margin: 0,
                padding: 0,
                border: 0,
                overflow: 'hidden',
                display: 'block'
            }
        };

    ns.Region = function(){

        ns.Dom.call(this, domInfo);

    };


    ns.Region.prototype = Object.create(ns.Dom.prototype);


    ns.Region.prototype.addChild = function(child, position, orientation){

    };


    ns.Region.prototype.removeChild = function(child){

    };


})(NS);