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
                    { prop: 'firstSlot', class: 'first-slot', style: { position: 'relative'} },
                    { prop: 'splitter', class: 'splitter', style: { position: 'relative'} },
                    { prop: 'secondSlot', class: 'second-slot', style: { position: 'relative'} }
                ]
            }
            , className = 'horizontal-paired-region'
            , varDim = 'width'
            , fixDim = 'height'
            , float = 'left'
            , display = 'inline-block'
            , cursor = 'e-resize'
            ;

        if(orientation === v){
            className = 'vertical-paired-region';
            varDim = 'height';
            fixDim = 'width';
            float = '';
            display = '';
            cursor = 'n-resize';
        }

        ns.Dom.call(this, domInfo);

        this.domRoot().className = className;
        this.dom.firstSlot.style[varDim] = this.dom.secondSlot.style[varDim] = 'calc(50% - ' + sWidth + 'px)';
        this.dom.splitter.style[varDim] = (sWidth * 2) + 'px';
        this.dom.firstSlot.style[fixDim] = this.dom.splitter.style[fixDim] = this.dom.secondSlot.style[fixDim] = '100%';
        this.dom.firstSlot.style.float = this.dom.splitter.style.float = this.dom.secondSlot.style.float = float;
        this.dom.firstSlot.style.display = this.dom.splitter.style.display = this.dom.secondSlot.style.display = display;
        this.dom.splitter.style.cursor = cursor;

        this.dom.splitter.addEventListener('mousedown', showResizeOverlay.bind(this), false);
        this.hideResizeListener = hideResizeOverlay.bind(this)

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild
        this.firstChild.parent = this;
        this.secondChild = secondChild;
        this.secondChild.parent = this;

        this.dom.firstSlot.appendChild(firstChild.domRoot());
        this.dom.secondSlot.appendChild(secondChild.domRoot());

        if(!ns.PairedRegion.verticalResizeOverlay){
            var bRad = ns.Layout.style.regionBorderRadius;
            ns.PairedRegion.verticalResizeOverlay = ns.Dom.domGenerator({
                id: 'vertical-resize-overlay', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top:0, left: 0, width: '100%', height: '100%', background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle(), cursor: 'n-resize'},
                children: [{ prop: 'splitter', id: 'vertical-resize-overlay-splitter', style: { height: (sWidth * 2)+'px', width: '100%', background: ns.Layout.style.colors.splitter.toStyle(), cursor: 'n-resize'}}]
            });
            ns.PairedRegion.horizontalResizeOverlay = ns.Dom.domGenerator({
                id: 'horizontal-resize-overlay', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, top: 0, left: 0, width: '100%', height: '100%', background: ns.Layout.style.colors.pairedRegionResizeOverlay.toStyle(), cursor: 'e-resize'},
                children: [{ prop: 'splitter', id: 'horizontal-resize-overlay-splitter', style: { width: (sWidth * 2)+'px', height: '100%', background: ns.Layout.style.colors.splitter.toStyle(), cursor: 'e-resize'}}]
            });
            ns.PairedRegion.resizeInProgress = false;
        }
    };


    ns.PairedRegion.prototype = Object.create(ns.Dom.prototype);


    ns.PairedRegion.prototype.addChild = function(child){
        var pos = (this.firstChild) ? 'secondChild' : 'firstChild'
            , slot = (pos === 'firstChild') ? 'firstSlot' : 'secondSlot';
            ;
        if(this[pos]){throw new Error("All PairedRegion child slots are occupied");}
        if(child.parent){throw new Error("Can not add a child that still has a parent.");}
        this[pos] = child;
        this.dom[slot].appendChild(child.domRoot());
        child.parent = this;
        return this;
    };


    ns.PairedRegion.prototype.removeChild = function(child){
        var pos = (this.firstChild === child) ? 'firstChild' : (this.secondChild === child) ? 'secondChild' : null
            , slot = (pos === 'firstChild') ? 'firstSlot' : 'secondSlot'
            ;
        if(pos){
            this[pos] = null;
            this.dom[slot].removeChild(child.domRoot());
            child.parent = null;
        }
    };


    ns.PairedRegion.prototype.isFirstChild = function(child){
        return this.firstChild === child;
    };


    ns.PairedRegion.prototype.resize = function(firstRegionFraction){
        var sWidth = ns.Layout.style.splitterWidth / 2
            , varDim = (this[ori] === h) ? 'width' : 'height'
            ;
        if(firstRegionFraction >= 1 || firstRegionFraction <= 0){throw new Error("Can't resize to fractions outside 1 > f > 0")}
        this.dom.firstSlot.style[varDim] = 'calc(' + firstRegionFraction*100 + '% - ' + sWidth + 'px)';
        this.dom.secondSlot.style[varDim] = 'calc(' + (100 - firstRegionFraction*100) + '% - ' + sWidth + 'px)';
    };


    function showResizeOverlay(event){
        if(ns.PairedRegion.resizeInProgress){return;}
        var o = this[ori]
            , overlay = ns.PairedRegion[o+'ResizeOverlay']
            , fnMouseMove = (o===v) ? verticalMouseMoveListener : horizontalMouseMoveListener
            , self = this
            ;
        ns.PairedRegion.resizeInProgress = true;
        this.domRoot().appendChild(overlay.root);
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
            , rectOver = overlay.root.getBoundingClientRect()
            , rectSplit = overlay.splitter.getBoundingClientRect()
            , varSide = (o === v) ? 'top' : 'left'
            , varDim = (o === v) ? 'height' : 'width'
            ;

        if(((rectSplit[varSide] - rectOver[varSide]) > (ns.Layout.style.splitterWidth + 10))
            && (rectSplit[varSide] < ((rectOver[varSide] + rectOver[varDim]) - ns.Layout.style.splitterWidth - 10))){
            this.resize((rectSplit[varSide] - rectOver[varSide]) /rectOver[varDim]);
        }
        this.domRoot().removeChild(overlay.root);
        window.removeEventListener('mousemove', fnMouseMove, false);
        window.removeEventListener('mousedown', this.hideResizeListener, false);
        ns.PairedRegion.resizeInProgress = false;
    }


    function verticalMouseMoveListener(event){
        var splitterStyle = ns.PairedRegion.verticalResizeOverlay.splitter.style
            , overlayOffsetY = ns.PairedRegion.verticalResizeOverlay.root.getBoundingClientRect().top
            ;
        splitterStyle.top = (event.clientY - overlayOffsetY) + 'px';
    }


    function horizontalMouseMoveListener(event){
        var splitterStyle = ns.PairedRegion.horizontalResizeOverlay.splitter.style
            , overlayOffsetX = ns.PairedRegion.horizontalResizeOverlay.root.getBoundingClientRect().left
            ;
        splitterStyle.left = (event.clientX - overlayOffsetX) + 'px';
    }

})(NS);