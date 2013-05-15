/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    ns.PairableRegion = function(child, resizeOrder){

        if(child.parent){throw new Error("Trying to adopt child that already has a parent");}

        ns.Dom.call(this, { class: 'pairable-region', style: { height: '100%', width: '100%'} });

        this.resizeOrder = resizeOrder || 1;
        this.parent = null;

        if(!(child instanceof ns.PairedRegion) && !(child instanceof ns.TabbableRegion)){
            throw new Error("Attempting to add a child to PairableRegion which is not a PairedRegion or TabbableRegion");
        }

        this.child = child;
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);
    };


    ns.PairableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.PairableRegion.prototype.pair = function(region, idx, orientation){

        if(region.parent){throw new Error("Trying to pair with a region that already has a parent");}

        var firstRegion = (idx === 0) ? region : this
            , secondRegion = (idx === 0) ? this : region
            , oldParent = this.parent
            , newParent
            ;

        this.removeSelf();

        newParent = new ns.PairableRegion(new ns.PairedRegion(firstRegion, secondRegion, orientation))

        if(oldParent){
            oldParent.addChild(newParent);
        }

        return newParent;

    };


    ns.PairableRegion.prototype.unpair = function(){
        if(this.parent instanceof ns.PairedRegion){
            var parent = this.parent
                , sibling = (parent.isFirstChild(this)) ? parent.secondChild : parent.firstChild
                , grandParent = this.parent.parent
                , greatGrandParent = grandParent.parent
                ;

            this.removeSelf();
            sibling.removeSelf();

            if(greatGrandParent){
                greatGrandParent.removeChild(grandParent);
                greatGrandParent.addChild(sibling);
            }
            parent.dispose();
        }else{
            throw new Error("this region is not paired");
        }
        return this;
    };


    ns.PairableRegion.prototype.removeChild = function(child){
        if(this.child === child){
            this.child = null;
            child.parent = null;
            this.dom.removeChild(child.dom);
        }
    };


    ns.PairableRegion.PairOverlay = ns.Dom.domGenerator({
        tag: 'div', id: 'pairable-overlay', style: {}
    });

})(NS);