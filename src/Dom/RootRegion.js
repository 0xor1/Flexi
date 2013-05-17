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

        ns.Dom.call(this, { id: 'root-region', style: { top: sWidth, right: sWidth, bottom: sWidth, left: sWidth, background: ns.Layout.style.colors.splitter.toStyle() } })

        ns.RootRegion.current = this;

    };


    ns.RootRegion.prototype = Object.create(ns.Dom.prototype);


    ns.RootRegion.prototype.addChild = function(child){
        if(this.child){return this;}
        if(child instanceof ns.PairableRegion){
            child.removeSelf();
            this.child = child;
            this.child.parent = this;
            this.domRoot().appendChild(child.domRoot());
        }
        return this;
    };


    ns.RootRegion.prototype.removeChild = function(child){
        if(this.child === child){
            this.child = null;
            child.parent = null;
            this.domRoot().removeChild(child.domRoot());
        }
    };


})(NS);