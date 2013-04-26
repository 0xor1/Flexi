/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    /**
     * FlexiRegion
     *  SplittableRegion
     *    (SplitRegion)
     *      TabbableRegion
     *          ContentRegion
     */
    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', class: rs.splittableRegion, style: { position: 'relative', height: '100%', width: '100%', margin: 0, padding: 0, border: 0, overflow: 'hidden', display: 'block' } }
        ;


    ns.SplittableRegion = function(child){

        ns.Dom.call(this, domInfo);

        this.addChild(child);
    };


    ns.SplittableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.SplittableRegion.prototype.split = function(child, idx, orientation){
        if(!this.child){
            this.child = child;
            if(child.parent){
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.dom.appendChild(child.dom);
        }else{
            var biRegion;
            if(idx = 0){
                biRegion = new ns.BiRegion(child, this.child, orientation);
            }else{
                biRegion = new ns.BiRegion(this.child, child, orientation);
            }
            this.children.push(biRegion);
            this.dom.appendChild(biRegion.dom);
        }
    };


    ns.SplittableRegion.prototype.removeChild = function(child){
    };


})(NS);