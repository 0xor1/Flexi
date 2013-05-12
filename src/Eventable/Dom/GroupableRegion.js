/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    ns.GroupableRegion = function(child, resizeOrder){

        if(child.parent){throw new Error("Trying to adopt child that already has a parent");}

        ns.Dom.call(this, { tag: 'div', class: 'groupable-region', style: { position: 'absolute', height: '100%', width: '100%', margin: 0, padding: 0, border: 0, overflow: 'hidden'} });

        this.resizeOrder = resizeOrder || 1;
        this.parent = null;

        if(!(child instanceof ns.GroupedRegion) && !(child instanceof ns.TabbableRegion)){
            throw new Error("Attempting to add a child to GroupableRegion which is not a GroupedRegion or TabbableRegion");
        }

        this.child = child;
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);
    };


    ns.GroupableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.GroupableRegion.prototype.group = function(region, idx, orientation){

        if(region.parent){throw new Error("Trying to group with a region that already has a parent");}

        var firstRegion = (idx === 0) ? region : this
            , secondRegion = (idx === 0) ? this : region
            , oldParent = this.parent
            , newParent
            ;

        this.removeSelf();

        newParent = new ns.GroupableRegion(new ns.GroupedRegion(firstRegion, secondRegion, orientation))

        if(oldParent){
            oldParent.addChild(newParent);
        }

        return newParent;

    };


    ns.GroupableRegion.prototype.ungroup = function(){
        if(this.parent instanceof ns.GroupedRegion){
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
            throw new Error("this region is not grouped");
        }
        return this;
    };


    ns.GroupableRegion.prototype.removeChild = function(child){
        if(this.child === child){
            this.child = null;
            child.parent = null;
            this.dom.removeChild(child.dom);
        }
    };


    ns.GroupableRegion.GroupOverlay = ns.Dom.domGenerator({
        tag: 'div', id: 'groupable-overlay', style: {}
    });

})(NS);