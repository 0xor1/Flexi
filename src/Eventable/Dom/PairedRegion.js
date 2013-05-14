/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {};

    //provides region resizing functionality, nothing else.
    //PairableRegion should take care of all external dom behaviour, paired region just adds and removes children from itself
    //It does not dispose of itself or modify any other components in any way.
    ns.PairedRegion = function(firstChild, secondChild, orientation){

        if(firstChild.parent || secondChild.parent){throw new Error("Trying to adopt child that already has a parent");}
        if(!(firstChild instanceof ns.PairableRegion) || !(secondChild instanceof ns.PairableRegion)){throw new Error("PairedRegion only accepts PairableRegions")}

        var sWidth = ns.Layout.style.splitterWidth / 2
            , domInfo = { tag: 'div', style: { position: 'absolute', width: '100%', height: '100%', padding: 0, margin: 0, border: 0, overflow: 'hidden' },
                children: [
                    { tag: 'div', class: 'paired-item', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'splitter', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'paired-item', style: { position: 'relative', overflow: 'hidden'} }
                ]
            }
            , className = 'horizontal-paired-region'
            , variableSide = 'height'
            , fixedSide = 'width'
            , float = ''
            , display = 'block'
            , cursor = 'n-resize'
            ;

        if(orientation === 'vertical'){
            className = 'vertical-paired-region';
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

        this.dom.children[1].addEventListener('mousedown', function(event){showResizeOverlay.call(this, event)}.bind(this), false);

        this.hideResizeListener = hideResizeOverlay.bind(this)
        this.verticalMouseMoveListener = function(event){
            var splitterStyle = ns.PairedRegion.verticalResizeOverlay.children[0].style
                , overlayOffsetX = ns.PairedRegion.verticalResizeOverlay.getBoundingClientRect().left
                ;
            splitterStyle.left =  event.clientX - overlayOffsetX;
        }.bind(this);
        this.horizontalMouseMoveListener = function(event){
            var splitterStyle = ns.PairedRegion.verticalResizeOverlay.children[0].style
                , overlayOffsetY = ns.PairedRegion.verticalResizeOverlay.getBoundingClientRect().top
                ;
            splitterStyle.top =  event.clientY - overlayOffsetY;
        }.bind(this);

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild
        this.firstChild.parent = this;
        this.secondChild = secondChild;
        this.secondChild.parent = this;

        insertChildDom.call(this, firstChild, 0);
        insertChildDom.call(this, secondChild, 1);

        //create static properties first time only
        if(!ns.PairedRegion.verticalResizeOverlay){
            ns.PairedRegion.verticalResizeOverlay = ns.Dom.domGenerator({
                tag: 'div', id: 'vertical-resize-overlay', style: {position: 'absolute', width: '100%', height: '100%', margin: 0, border: 0, padding: 0, background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle()},
                children: [{tag: 'div', id: 'vertical-resize-overlay-splitter', style: {position: 'absolute', height: '100%', width: (sWidth * 2)+'px', background: ns.Layout.style.colors.splitter.toStyle()}}]
            });

            ns.PairedRegion.horizontalResizeOverlay = ns.Dom.domGenerator({
                tag: 'div', id: 'horizontal-resize-overlay', style: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', margin: 0, border: 0, padding: 0, background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle()},
                children: [{tag: 'div', id: 'horizontal-resize-overlay-splitter', style: {position: 'absolute', width: '100%', height: (sWidth * 2)+'px', background: ns.Layout.style.colors.splitter.toStyle()}}]
            });
        }
    };


    ns.PairedRegion.prototype = Object.create(ns.Dom.prototype);


    ns.PairedRegion.prototype.addChild = function(child){
        var slot = (this.firstChild) ? 'secondChild' : 'firstChild'
            , idx = (slot === 'firstChild') ? 0 : 2;
            ;
        if(this[slot]){throw new Error("All PairedRegion child slots are occupied");}
        if(child.parent){throw new Error("Can not add a child that still has a parent.");}
        this[slot] = child;
        insertChildDom.call(this, child, idx);
        child.parent = this;
        return this;
    };


    ns.PairedRegion.prototype.removeChild = function(child){
        var slot = (this.firstChild === child) ? 'firstChild' : (this.secondChild === child) ? 'secondChild' : null
            , idx = (slot === 'firstChild') ? 0 : 2
            ;
        if(slot){
            this[slot] = null;
            this.dom.children[idx].removeChild(child.dom);
            child.parent = null;
        }
    };


    ns.PairedRegion.prototype.resize = function(firstRegionPercentage){
        var sWidth = ns.Layout.style.splitterWidth / 2
            , variableSide = (this.orientation === 'vertical') ? 'width' : 'height'
            ;
        if(firstRegionPercentage >= 100 || firstPercentage <= 0){throw new Error("Can't resize to percentages outside 100 > p > 0")}
        this.dom.children[0].style[variableSide] = 'calc(' + firstRegionPercentage + '% - ' + sWidth + 'px)';
        this.dom.children[2].style[variableSide] = 'calc(' + (100 - firstRegionPercentage) + '% - ' + sWidth + 'px)';
    };


    ns.PairedRegion.prototype.isFirstChild = function(child){
        return this.firstChild === child;
    };


    ns.PairedRegion.prototype.isSecondChild = function(child){
        return this.secondChild === child;
    };


    function insertChildDom(child, idx){
        idx = (idx === 0) ? 0 : 2;
        this.dom.children[idx].appendChild(child.dom);
    }


    function showResizeOverlay(){
        var overlay = this.orientation + "ResizeOverlay";
        this.dom.appendChild(ns.PairedRegion[overlay]);
        ns.PairedRegion[overlay].addEventListener('mousemove', this[this.orientation + 'MouseMoveListener'], false);
        window.addEventListener('mouseup', this.hideResizeListener, false);
    }

    function hideResizeOverlay(){
        var overlay = this.orientation + "ResizeOverlay";
        this.dom.removeChild(ns.PairedRegion[overlay]);
        ns.PairedRegion[overlay].removeEventListener('mousemove', this[this.orientation + 'MouseMoveListener'], false);
        window.removeEventListener('mouseup', this.hideResizeListener, false);
    }

})(NS);