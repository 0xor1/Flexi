/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

/*(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', class: rs.splittableRegion, style: { position: 'absolute', height: '100%', width: '100%', margin: 0, padding: 0, border: 0, overflow: 'hidden'} }
        ;

    ns.SplittableRegion = function(child){

        ns.Dom.call(this, domInfo);

        if(child instanceof ns.SplitRegion || child instanceof ns.TabbableRegion){
            this.addChild(child);
        }else{
            throw new Error("Attempting to add a child to SplittableRegion which is not a SplitRegion or TabbableRegion");
        }

        this.parent = null;
        this.child = child;
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);
    };


    ns.SplittableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.SplittableRegion.prototype.addChild = function(child, idx, orientation){
        var firstChild = (idx === 0) ? child : new ns.SplittableRegion(this.child)
            , secondChild = (idx === 0) ? new ns.SplittableRegion(this.child) : child;
        this.child = new ns.SplitRegion(firstChild, secondChild, orientation);
        this.child.parent = this;
        this.dom.appendChild(this.child.dom);
        return this;
    };


    ns.SplittableRegion.prototype.removeChild = function(child){
        if(this.firstChild() === child){

        }else{
            if(this.secondChild() === child){

            }else{
                throw new Error("Attempting to remove a child from wrong parent.");
            }
        }
        return this;
    };


    ns.SplittableRegion.prototype.isSplit = function(){
        return this.child instanceof ns.SplitRegion;
    };


    ns.SplittableRegion.prototype.firstChild = function(){
        if(this.isSplit()){
            return this.child.firstChild(); //implement this method in ns.SplitRegion.prototype
        }else{
            return null;
        }
    };


    ns.SplittableRegion.prototype.secondChild = function(){
        if(this.isSplit()){
            return this.child.secondChild(); //implement this method in ns.SplitRegion.prototype
        }else{
            return null;
        }
    };


})(NS);*/