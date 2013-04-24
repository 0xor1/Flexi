/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 23/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs;

    ns.Dom = function(domInfo){

        ns.Eventable.call(this);

        this._dom = htmlGenerator(domInfo);

    };


    ns.Dom.prototype = Object.create(ns.Eventable.prototype);


    ns.Dom.prototype.addChild = function(child){
        throw new Error("Dom object does not implement addChild method");
    }


    ns.Dom.prototype.removeChild = function(child){
        throw new Error("Dom object does not implement removeChild method");
    }


    function htmlGenerator(domInfo){
        if(!domInfo){return null;}
        for(var i = 0, l = dom.length; i < l; i++){
            var elInfo = domInfo[i];
            var dom = document.createElement(elInfo.tag);
            style(dom, elInfo.style);
            if(elInfo.children && elInfo.children.length > 0){
                dom.addChild(ns.Dom.htmlGenerator(elInfo.children));
            }
        }
        return dom;
    }


    function style(dom, style){
        for(var i in style){
            if(dom.style.hasOwnProperty(i)){
                dom.style[i] = style[i];
            }
        }
    }

})(NS);