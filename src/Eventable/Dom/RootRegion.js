/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 06/05/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    ns.RootRegion = function(){

        if(ns.RootRegion.current){
            return ns.RootRegion.current;
        }

        var sWidth = ns.Layout.style.splitterWidth + 'px'
            ;

        ns.Dom.call(this, { tag: 'div', id: 'root-region', style: { position: 'absolute', margin: 0, border: 0, padding: 0, top: sWidth, right: sWidth, bottom: sWidth, left: sWidth, overflow: 'hidden', background: ns.Layout.style.colors.splitter.toStyle() } })

        ns.RootRegion.current = this;

    };


    ns.RootRegion.prototype = Object.create(ns.Dom.prototype);


    ns.RootRegion.prototype.addChild = function(child){
        if(this.child){return this;}
        if(child instanceof ns.GroupableRegion){
            child.removeSelf();
            this.child = child;
            this.child.parent = this;
            this.dom.appendChild(child.dom);
        }
        return this;
    };


    ns.RootRegion.prototype.removeChild = function(child){
        if(this.child === child){
            this.child = null;
            child.parent = null;
            this.dom.removeChild(child.dom);
        }
    };


})(NS);