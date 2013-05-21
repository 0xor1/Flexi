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
            , grabColor = ns.Layout.style.colors.grabber.toStyle()
            , splitterColor = ns.Layout.style.colors.splitter.toStyle()
            , boxShad = '10px 10px 5px #888'
            ;
        ns.Dom.call(this,{
            class: 'floating-region', style: { boxShadow: boxShad, WebkitBoxShadow: boxShad, MozBoxShadow: boxShad, border: '1px solid '+ grabColor, borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: 0, topLeftBorderRadius: bRad, WebkitTopLeftBorderRadius: bRad, MozTopLeftBorderRadius: bRad, top: '25%', left: '125%', width: '50%', height: '50%',background: splitterColor},
            children: [
                {prop: 'topLeftResizer', class: 'top-left-resizer', style: {top: 0, left: 0, width: sWidth, height: sWidth, cursor: 'nw-resize', background: splitterColor}},
                {prop: 'topResizer', class: 'top-resizer', style: {top: 0, left: sWidth, right: sWidth, height: sWidth, cursor: 'n-resize', background: splitterColor}},
                {prop: 'topRightResizer', class: 'top-right-resizer', style: {top: 0, right: 0, width: sWidth, height: sWidth, cursor: 'ne-resize', background: splitterColor}},
                {prop: 'rightResizer', class: 'right-resizer', style: {top: sWidth, right: 0, bottom: sWidth, width: sWidth , cursor: 'e-resize', background: splitterColor}},
                {prop: 'bottomRightResizer', class: 'bottom-right-resizer', style: {bottom: 0, right: 0, width: sWidth, height: sWidth, cursor: 'nw-resize', background: splitterColor}},
                {prop: 'bottomResizer', class: 'bottom-resizer', style: {bottom: 0, right: sWidth, left: sWidth, height: sWidth, cursor: 'n-resize', background: splitterColor}},
                {prop: 'bottomLeftResizer', class: 'bottom-left-resizer', style: {bottom: 0, left: 0, width: sWidth, height: sWidth, cursor: 'ne-resize', background: splitterColor}},
                {prop: 'leftResizer', class: 'left-resizer', style: {top: sWidth, left: 0, width: sWidth, bottom: sWidth, cursor: 'e-resize', background: splitterColor}},
                {prop: 'pairableSlot', class: 'pairable-slot', style: {left: sWidth, top: sWidth, right: sWidth, bottom: sWidth}}
            ]
        });

        pairableRegion.parent = this;
        this.child = pairableRegion;
        this.dom.pairableSlot.appendChild(pairableRegion.domRoot());
        ns.Layout.current.dom.floatAnchor.appendChild(this.domRoot());

        this.focusListener = function(event){
            ns.Layout.current.dom.floatAnchor.appendChild(this.domRoot());
        }.bind(this);
        this.domRoot().addEventListener('mousedown', this.focusListener, false);
    };


    ns.FloatingRegion.prototype = Object.create(ns.Dom.prototype);


    ns.FloatingRegion.prototype.relocate = function(event){

    };

})(NS);