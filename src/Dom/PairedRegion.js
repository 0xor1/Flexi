/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , ori = 'orientation'
        , h = 'horizontal'
        , v = 'vertical'
        ;

    //provides region resizing functionality, nothing else.
    //PairableRegion should take care of all external dom behaviour, paired region just adds and removes children from itself
    //It does not dispose of itself or modify any other components in any way.
    ns.PairedRegion = function(firstChild, secondChild, orientation){

        if(firstChild.parent || secondChild.parent){throw new Error("Trying to adopt child that already has a parent");}
        if(!(firstChild instanceof ns.PairableRegion) || !(secondChild instanceof ns.PairableRegion)){throw new Error("PairedRegion only accepts PairableRegions")}
        if(orientation !== v && orientation !== h){throw new Error("An orientation must be specified");}

        var sWidth = ns.Layout.style.splitterWidth / 2
            , domInfo = { style: { height: '100%', width: '100%'},
                children: [
                    { class: 'first-paired-item', style: { position: 'relative'} },
                    { class: 'splitter', style: { position: 'relative'} },
                    { class: 'second-paired-item', style: { position: 'relative'} }
                ]
            }
            , className = 'horizontal-paired-region'
            , variableSide = 'width'
            , fixedSide = 'height'
            , float = 'left'
            , display = 'inline-block'
            , cursor = 'e-resize'
            ;

        if(orientation === v){
            className = 'vertical-paired-region';
            variableSide = 'height';
            fixedSide = 'width';
            float = '';
            display = '';
            cursor = 'n-resize';
        }
        domInfo.class = className;
        domInfo.children[0].style[variableSide] =
            domInfo.children[2].style[variableSide] = 'calc(50% - ' + sWidth + 'px)';
        domInfo.children[1].style[variableSide] = (sWidth * 2) + 'px';
        domInfo.children[0].style[fixedSide] =
            domInfo.children[1].style[fixedSide] = domInfo.children[2].style[fixedSide] = '100%';
        domInfo.children[0].style.float = domInfo.children[1].style.float = domInfo.children[2].style.float = float;
        domInfo.children[0].style.display =
            domInfo.children[1].style.display = domInfo.children[2].style.display = display;
        domInfo.children[1].style.cursor = cursor;

        ns.Dom.call(this, domInfo);

        this.dom.children[1].addEventListener('mousedown', showResizeOverlay.bind(this), false);
        this.hideResizeListener = hideResizeOverlay.bind(this)

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
            var bRad = ns.Layout.style.regionBorderRadius
            ns.PairedRegion.verticalResizeOverlay = ns.Dom.domGenerator({
                id: 'vertical-resize-overlay', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top:0, left: 0, width: '100%', height: '100%', background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle(), cursor: 'n-resize'},
                children: [{ id: 'vertical-resize-overlay-splitter', style: { height: (sWidth * 2)+'px', width: '100%', background: ns.Layout.style.colors.splitter.toStyle(), cursor: 'n-resize'}}]
            });
            ns.PairedRegion.horizontalResizeOverlay = ns.Dom.domGenerator({
                id: 'horizontal-resize-overlay', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 0, left: 0, width: '100%', height: '100%', background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle(), cursor: 'e-resize'},
                children: [{ id: 'horizontal-resize-overlay-splitter', style: { width: (sWidth * 2)+'px', height: '100%', background: ns.Layout.style.colors.splitter.toStyle(), cursor: 'e-resize'}}]
            });
            ns.PairedRegion.resizeInProgress = false;
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
            , varDim = (this[ori] === h) ? 'width' : 'height'
            ;
        if(firstRegionPercentage >= 100 || firstRegionPercentage <= 0){throw new Error("Can't resize to percentages outside 100 > p > 0")}
        this.dom.children[0].style[varDim] = 'calc(' + firstRegionPercentage + '% - ' + sWidth + 'px)';
        this.dom.children[2].style[varDim] = 'calc(' + (100 - firstRegionPercentage) + '% - ' + sWidth + 'px)';
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


    function showResizeOverlay(event){
        if(ns.PairedRegion.resizeInProgress){return;}
        var o = this[ori]
            , overlay = ns.PairedRegion[o+'ResizeOverlay']
            , fnMouseMove = (o===v) ? verticalMouseMoveListener : horizontalMouseMoveListener
            , self = this
            ;
        ns.PairedRegion.resizeInProgress = true;
        this.dom.appendChild(overlay);
        fnMouseMove(event);
        setTimeout(function(){
                window.addEventListener('mousemove', fnMouseMove, false);
                window.addEventListener('mousedown', self.hideResizeListener, false);
            },
            0
        );
    }

    function hideResizeOverlay(){
        var o = this[ori]
            , overlay = ns.PairedRegion[o+'ResizeOverlay']
            , fnMouseMove = (o===v) ? verticalMouseMoveListener : horizontalMouseMoveListener
            , rectOver = overlay.getBoundingClientRect()
            , rectSplit = overlay.children[0].getBoundingClientRect()
            , varSide = (o === v) ? 'top' : 'left'
            , varDim = (o === v) ? 'height' : 'width'
            ;

        if(((rectSplit[varSide] - rectOver[varSide]) > (ns.Layout.style.splitterWidth + 10))
            && (rectSplit[varSide] < ((rectOver[varSide] + rectOver[varDim]) - ns.Layout.style.splitterWidth - 10))){
            this.resize(((rectSplit[varSide] - rectOver[varSide]) /rectOver[varDim])*100);
        }
        this.dom.removeChild(overlay);
        window.removeEventListener('mousemove', fnMouseMove, false);
        window.removeEventListener('mousedown', this.hideResizeListener, false);
        ns.PairedRegion.resizeInProgress = false;
    }


    function verticalMouseMoveListener(event){
        var splitterStyle = ns.PairedRegion.verticalResizeOverlay.children[0].style
            , overlayOffsetY = ns.PairedRegion.verticalResizeOverlay.getBoundingClientRect().top
            ;
        splitterStyle.top = (event.clientY - overlayOffsetY) + 'px';
    }


    function horizontalMouseMoveListener(event){
        var splitterStyle = ns.PairedRegion.horizontalResizeOverlay.children[0].style
            , overlayOffsetX = ns.PairedRegion.horizontalResizeOverlay.getBoundingClientRect().left
            ;
        splitterStyle.left = (event.clientX - overlayOffsetX) + 'px';
    }


})(NS);