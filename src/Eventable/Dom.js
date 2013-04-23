/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 23/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs;

    ns.Dom = function(dom){

        ns.Eventable.call(this);

        this._dom = dom || null;

    };

    ns.Dom.style = function(dom, style){
        for(var i in style){
            if(dom.style.hasOwnProperty(i)){
                dom.style[i] = style[i];
            }
        }
    };

    ns.Dom.prototype = Object.create(ns.Eventable.prototype);

})(NS);