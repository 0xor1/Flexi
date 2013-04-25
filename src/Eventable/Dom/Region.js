/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    /**
     * FlexiRegion
     *  SplittableRegion
     *      TabbableRegion
     *          ContentRegion
     */
    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = {
            tag: 'div',
            class: NS + "-region",
            style: {
                position: 'relative',
                height: '100%',
                width: '100%',
                margin: 0,
                padding: 0,
                border: 0,
                overflow: 'hidden',
                display: 'block'
            }
        }
        ;


    ns.Region = function(child){

        ns.Dom.call(this, domInfo);

        this.addChild(child);
    };


    ns.Region.prototype = Object.create(ns.Dom.prototype);


    ns.Region.prototype.addChild = function(child, idx, orientation){
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


    ns.Region.prototype.removeChild = function(child){
    };


})(NS);