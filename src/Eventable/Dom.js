/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 23/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        ;

    ns.Dom = function(domInfo){

        ns.Eventable.call(this);

        this.dom = ns.Dom.domGenerator(domInfo);

    };


    ns.Dom.prototype = Object.create(ns.Eventable.prototype);


    ns.Dom.prototype.addChild = function(){
        throw new Error("Dom object does not implement addChild method");
    }


    ns.Dom.prototype.removeChild = function(){
        throw new Error("Dom object does not implement removeChild method");
    }


    ns.Dom.prototype.dispose = function(){
        this.dom.parentNode.removeChild(this.dom);
        ns.Eventable.prototype.dispose.call(this);
    };

    ns.Dom.domGenerator = function(domInfo){
        if(!domInfo){return null;}
        var dom = document.createElement(domInfo.tag);
        ns.Dom.style(dom, domInfo.style);
        dom.className = domInfo.class;
        dom.id = domInfo.id;
        if(domInfo.children && domInfo.children.length > 0){
            for(var i = 0, l = domInfo.children.length; i < l; i++){
                dom.appendChild(domGenerator(domInfo.children[i]));
            }
        }
        return dom;
    }


    ns.Dom.style = function(dom, style){
        for(var i in style){
            if(dom.style.hasOwnProperty(i)){
                dom.style[i] = style[i];
            }
        }
    }


})(NS);