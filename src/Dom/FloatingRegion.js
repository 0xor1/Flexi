/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 04/05/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        ;


    ns.FloatingRegion = function(pairableRegion){
        var sWidth = ns.Layout.style.splitterWidth + 'px'
            , bRad = ns.Layout.style.regionBorderRadius
            , grabSize = '20px'
            ;
        ns.Dom.call(this,{
            class: 'floating-region', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: 0, topLeftBorderRadius: bRad, WebkitTopLeftBorderRadius: bRad, MozTopLeftBorderRadius: bRad, top: '25%', left: '125%', width: '50%', height: '50%', overflow: 'visible'},
            children: [
                {prop: 'topLeftResizer', class: 'top-left-resizer', style: {top: 0, left: 0, width: sWidth, height: sWidth, cursor: 'nw-resize'}},
                {prop: 'topResizer', class: 'top-resizer', style: {top: 0, left: sWidth, right: sWidth, height: sWidth, cursor: 'n-resize'}},
                {prop: 'topRightResizer', class: 'top-right-resizer', style: {top: 0, right: 0, width: sWidth, height: sWidth, cursor: 'ne-resize'}},
                {prop: 'rightResizer', class: 'right-resizer', style: {top: sWidth, right: 0, bottom: sWidth, width: sWidth , cursor: 'e-resize'}},
                {prop: 'bottomRightResizer', class: 'bottom-right-resizer', style: {bottom: 0, right: 0, width: sWidth, height: sWidth, cursor: 'nw-resize'}},
                {prop: 'bottomResizer', class: 'bottom-resizer', style: {bottom: 0, right: sWidth, left: sWidth, height: sWidth, cursor: 'n-resize'}},
                {prop: 'bottomLeftResizer', class: 'bottom-left-resizer', style: {bottom: 0, left: 0, width: sWidth, height: sWidth, cursor: 'ne-resize'}},
                {prop: 'leftResizer', class: 'left-resizer', style: {top: sWidth, left: 0, width: sWidth, bottom: sWidth, cursor: 'e-resize'}},
                {prop: 'pairableSlot', class: 'pairable-slot', style: {left: sWidth, top: sWidth, right: sWidth, bottom: sWidth}},
                {prop: 'grabber', class: 'grabber', style: {left: 0, top: '-'+grabSize, width: grabSize, height: grabSize, topLeftBorderRadius: bRad, WebkitTopLeftBorderRadius: bRad, MozTopLeftBorderRadius: bRad, topRightBorderRadius: bRad, WebkitTopRightBorderRadius: bRad, MozTopRightBorderRadius: bRad }}
            ]
        });

        pairableRegion.unpair();
        pairableRegion.parent = this;
        this.child = pairableRegion;
        this.dom.pairableSlot.appendChild(pairableRegion.domRoot());
    };


    ns.FloatingRegion.prototype = Object.create(ns.Dom.prototype);


    ns.FloatingRegion.prototype.relocate = function(event){

    };

})(NS);