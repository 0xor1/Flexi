/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs;

    ns.Region = function(){

        ns.Dom.call(this, {
            tag: rs.d,
            style: {
                position: 'relative'
            },
            children: [
            ]
        });

    };


    ns.Region.htmlGenerator = function(){

    };

    ns.Region.prototype = Object.create(ns.Dom.prototype);


    ns.Region.prototype.addChild = function(){

    };


    ns.Region.prototype.removeChild = function(){

    };



})(NS);