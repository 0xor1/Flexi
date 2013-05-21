/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 24/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    ns.PairableRegion = function(child){

        if(child.parent){throw new Error("Trying to adopt child that already has a parent");}
        if(!(child instanceof ns.PairedRegion) && !(child instanceof ns.ContentRegion)){
            throw new Error("Attempting to add a child to PairableRegion which is not a PairedRegion or TabbableRegion");
        }

        ns.Dom.call(this, { class: 'pairable-region', style: { height: '100%', width: '100%'} });

        this.showOverlayListener = function(event){

        }.bind(this);

        this.parent = null;
        this.child = child;
        this.child.parent = this;
        this.domRoot().appendChild(this.child.domRoot());
        this.mouseOverListener = function(event){
            event.stopPropagation();
            if(ns.PairableRegion.grabbedRegion){
                ns.PairableRegion.overedRegion = this;
                this.showOverlay();
            }
        }.bind(this);
        this.domRoot().addEventListener('mouseover', this.mouseOverListener, false);
    };


    ns.PairableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.PairableRegion.prototype.pair = function(pairableRegion, idx, orientation){

        if(pairableRegion.parent){throw new Error("Trying to pair with a region that already has a parent");}
        if(!(pairableRegion instanceof ns.PairableRegion)){throw new Error("Can't pair with a non pairable region");}

        var firstRegion = (idx === 0) ? pairableRegion : this
            , secondRegion = (idx === 0) ? this : pairableRegion
            , oldParent = this.parent
            , newParent
            ;

        if(oldParent){//parent could be rootRegion, floatingRegion, pairedRegion and nothing else => ensure those three class implement removeChild(child) method
            oldParent.removeChild(this);
        }

        newParent = new ns.PairableRegion(new ns.PairedRegion(firstRegion, secondRegion, orientation))

        if(oldParent){//parent could be rootRegion, floatingRegion, pairedRegion and nothing else => ensure those three class implement addChild(child) method
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

            parent.removeChild(this);
            parent.removeChild(sibling);

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

    ns.PairableRegion.prototype.hide = function(){
        if(this.isHidden){return;}
        this.float();
        this.hide
    };

    ns.PairableRegion.prototype.show = function(){
        if(this.isHidden){

        }
    };

    ns.PairableRegion.prototype.float = function(){
        if(this.parent instanceof ns.FloatingRegion){return;}
        this.unpair();
        new ns.FloatingRegion(this);
    };



    ns.PairableRegion.prototype.removeChild = function(child){
        if(this.child === child){
            this.child = null;
            child.parent = null;
            this.domRoot().removeChild(child.domRoot());
        }
    };


    ns.PairableRegion.prototype.showOverlay = function(){
        this.domRoot().appendChild(ns.PairableRegion.pairOverlay.root);
    };

    var selSize = ns.Layout.style.selectorSize
        , bRad = ns.Layout.style.regionBorderRadius
        , grabColor = ns.Layout.style.colors.grabber.toStyle()
        , overlayColor = ns.Layout.style.colors.overlay.toStyle()
        ;

    ns.PairableRegion.pairOverlay = ns.Dom.domGenerator({
        id: 'pair-overlay', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top:0, left: 0, width: '100%', height: '100%', background: overlayColor},
        children: [
            { prop: 'topSelector', id: 'top-selector', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 'calc( 50% - ' + 2*selSize + 'px)', left: 'calc(50% - '+selSize*0.5+'px)', width: selSize+'px', height: selSize+'px', background: grabColor},
                children: [{style: {left: '5px', top: '5px', right: '5px', bottom: selSize*0.5+'px', borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, background: '#fff'}}]},
            { prop: 'leftSelector', id: 'left-selector', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 'calc( 50% - ' + 0.5*selSize + 'px)', left: 'calc(50% - '+selSize*2+'px)', width: selSize+'px', height: selSize+'px', background: grabColor},
                children: [{style: {left: '5px', top: '5px', right: selSize*0.5+'px', bottom: '5px', borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, background: '#fff'}}]},
            { prop: 'rightSelector', id: 'right-selector', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 'calc( 50% - ' + 0.5*selSize + 'px)', left: 'calc(50% + '+selSize+'px)', width: selSize+'px', height: selSize+'px', background: grabColor },
                children: [{style: {left: selSize*0.5+'px', top: '5px', right: '5px', bottom: '5px', borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, background: '#fff'}}]},
            { prop: 'bottomSelector', id: 'bottom-selector', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 'calc( 50% + ' +selSize + 'px)', left: 'calc(50% - '+0.5*selSize+'px)', width: selSize+'px', height: selSize+'px', background: grabColor },
                children: [{style: {left: '5px', top: selSize*0.5+'px', right: '5px', bottom: '5px', borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, background: '#fff'}}]}
        ]
    });

    ns.PairableRegion.pairOverlay.root.addEventListener('mousedown', function(event){
        ns.PairableRegion.pairOverlay.root.parentNode.removeChild(ns.PairableRegion.pairOverlay.root);
        ns.PairableRegion.overedRegion = null;
    },false);

    ns.PairableRegion.pairOverlay.topSelector.addEventListener('mousedown', function(event){
        ns.Layout.current.dom.floatAnchor.removeChild(ns.PairableRegion.grabbedRegion.parent.domRoot());
        ns.PairableRegion.grabbedRegion.parent.removeChild(ns.PairableRegion.grabbedRegion);
        ns.PairableRegion.overedRegion.pair(ns.PairableRegion.grabbedRegion,0,'vertical');
    }, false);

    ns.PairableRegion.pairOverlay.leftSelector.addEventListener('mousedown', function(event){
        ns.Layout.current.dom.floatAnchor.removeChild(ns.PairableRegion.grabbedRegion.parent.domRoot());
        ns.PairableRegion.grabbedRegion.parent.removeChild(ns.PairableRegion.grabbedRegion);
        ns.PairableRegion.overedRegion.pair(ns.PairableRegion.grabbedRegion,0,'horizontal');
    }, false);

    ns.PairableRegion.pairOverlay.rightSelector.addEventListener('mousedown', function(event){
        ns.Layout.current.dom.floatAnchor.removeChild(ns.PairableRegion.grabbedRegion.parent.domRoot());
        ns.PairableRegion.grabbedRegion.parent.removeChild(ns.PairableRegion.grabbedRegion);
        ns.PairableRegion.overedRegion.pair(ns.PairableRegion.grabbedRegion,1,'horizontal');
    }, false);

    ns.PairableRegion.pairOverlay.bottomSelector.addEventListener('mousedown', function(event){
        ns.Layout.current.dom.floatAnchor.removeChild(ns.PairableRegion.grabbedRegion.parent.domRoot());
        ns.PairableRegion.grabbedRegion.parent.removeChild(ns.PairableRegion.grabbedRegion);
        ns.PairableRegion.overedRegion.pair(ns.PairableRegion.grabbedRegion,1,'vertical');
    }, false);

    ns.PairableRegion.grabbedRegion = null;

})(NS);