/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    ns.SplittableRegion = function(child){

        ns.Dom.call(this, { tag: 'div', class: 'splittable-region', style: { position: 'absolute', height: '100%', width: '100%', margin: 0, padding: 0, border: 0, overflow: 'hidden'} });

        this.parent = null;

        if(!(child instanceof ns.SplitRegion) || !(child instanceof ns.TabbableRegion)){
            throw new Error("Attempting to add a child to SplittableRegion which is not a SplitRegion or TabbableRegion");
        }

        this.child = child;
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);
    };


    ns.SplittableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.SplittableRegion.prototype.addChild = function(child, idx, orientation){

        if(!this.child){
            if(child)
            this.child = child;
            this.child.parent = this;
            this.dom.appendChild(child.dom);
            return this;
        }

        var firstChild = (idx === 0) ? child : this
            , secondChild = (idx === 0) ? this : child
            , oldParent = this.parent
            , newParent = new ns.SplittableRegion(new ns.SplitRegion(firstChild, secondChild, orientation))
            ;

        oldParent.addChild(newParent);

        return this;

    };

    //ALT METHOD THINK ABOUT THIS CAREFULLY
    /*ns.SplittableRegion.prototype.addChild = function(child, idx, orientation){

        var firstChild = (idx === 0) ? child : new ns.SplittableRegion(this.child)
            , secondChild = (idx === 0) ? new ns.SplittableRegion(this.child) : child
            ;

        this.child = new ns.SplitRegion(firstChild, secondChild, orientation);
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);

        return this;

    };*/


})(NS);