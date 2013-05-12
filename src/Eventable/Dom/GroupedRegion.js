/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {};

    //provides region resizing functionality, nothing else.
    //GroupableRegion should take care of all external dom behaviour, grouped region just adds and removes children from itself
    //It does not dispose of itself or modify any other components in any way.
    ns.GroupedRegion = function(firstChild, secondChild, orientation){

        if(firstChild.parent || secondChild.parent){throw new Error("Trying to adopt child that already has a parent");}

        var sWidth = ns.Layout.style.splitterWidth / 2
            , domInfo = { tag: 'div', style: { position: 'absolute', width: '100%', height: '100%', padding: 0, margin: 0, border: 0, overflow: 'hidden' },
                children: [
                    { tag: 'div', class: 'split-chunk', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'splitter', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'split-chunk', style: { position: 'relative', overflow: 'hidden'} }
                ]
            }
            , className = 'horizontal-grouped-region'
            , variableSide = 'height'
            , fixedSide = 'width'
            , float = ''
            , display = 'block'
            , cursor = 'n-resize'
            ;

        if(orientation === 'vertical'){
            className = 'vertical-grouped-region';
            variableSide = 'width';
            fixedSide = 'height';
            float = 'left';
            display = 'inline-block';
            cursor = 'e-resize';
        }
        domInfo.class = className;
        domInfo.children[0].style[variableSide] =
            domInfo.children[2].style[variableSide] = 'calc(50% - ' + sWidth + 'px)';
        domInfo.children[1].style[variableSide] = (sWidth * 2) + 'px';
        domInfo.children[0].style[fixedSide] =
            domInfo.children[1].style[fixedSide] = domInfo.children[2].style[fixedSide] = '100%';
        domInfo.children[0].style.float = domInfo.children[1].style.float = domInfo.children[2].style.float = float;
        domInfo.children[0].style.display =
            domInfo.children[1].style.dsiplay = domInfo.children[2].style.display = display;
        domInfo.children[1].style.cursor = cursor;

        ns.Dom.call(this, domInfo);

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild
        this.firstChild.parent = this;
        this.secondChild = secondChild;
        this.secondChild.parent = this;

        insertChildDom.call(this, firstChild, 0);
        insertChildDom.call(this, secondChild, 1)

    };


    ns.GroupedRegion.prototype = Object.create(ns.Dom.prototype);


    ns.GroupedRegion.prototype.addChild = function(child){
        var slot = (this.firstChild) ? 'secondChild' : 'firstChild'
            , idx = (slot === 'firstChild') ? 0 : 2;
            ;
        if(this[slot]){throw new Error("All GroupedRegion child slots are occupied");}
        if(child.parent){throw new Error("Can not add a child that still has a parent.");}
        this[slot] = child;
        insertChildDom.call(this, child, idx);
        child.parent = this;
        return this;
    };


    ns.GroupedRegion.prototype.removeChild = function(child){
        var slot = (this.firstChild === child) ? 'firstChild' : (this.secondChild === child) ? 'secondChild' : null
            , idx = (slot === 'firstChild') ? 0 : 2
            ;
        if(slot){
            this[slot] = null;
            this.dom.children[idx].removeChild(child.dom);
            child.parent = null;
        }
    };


    ns.GroupedRegion.prototype.resize = function(firstRegionPercentage){
        var sWidth = ns.Layout.style.splitterWidth / 2
            , variableSide = (this.orientation === 'vertical') ? 'width' : 'height'
            ;
        this.dom.children[0].style[variableSide] = 'calc(' + firstRegionPercentage + '% - ' + sWidth + 'px)';
        this.dom.children[2].style[variableSide] = 'calc(' + (100 - firstRegionPercentage) + '% - ' + sWidth + 'px)';
    };


    ns.GroupedRegion.prototype.isFirstChild = function(child){
        return this.firstChild === child;
    };


    ns.GroupedRegion.prototype.isSecondChild = function(child){
        return this.secondChild === child;
    };


    ns.GroupedRegion.prototype.dispose = function(){

        ns.Dom.prorotype.dispose.call(this);
    }

    function insertChildDom(child, idx){
        idx = (idx === 0) ? 0 : 2;
        this.dom.children[idx].appendChild(child.dom);
    }


})(NS);