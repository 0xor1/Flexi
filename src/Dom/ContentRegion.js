/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 27/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    //Note - this should be the Tabbable region in future implementations if tabs are requested
    ns.ContentRegion = function(domControl){

        var bRad = ns.Layout.style.regionBorderRadius
            , grabW = ns.Layout.style.grabberW
            , grabH = ns.Layout.style.grabberH
            , grabColor = ns.Layout.style.colors.grabber.toStyle();
            ;

        ns.Dom.call(this, {
            class: 'content-region', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, width:'calc(100% - 2px)', height:'calc(100% - 2px)', border: '1px solid #ff5721', background: '#fff'},
            children: [
                { prop: 'grabber', class: 'grabber', style: { borderBottomRightRadius: bRad, WebkitBorderBottomRightRadius: bRad, MozBorderBottomRightRadius: bRad, width: grabW, height: grabH, background: grabColor}},
                { prop: 'grabberCurlOutFill', class: 'grabber-curl-out-fill', style: { left: grabW, width: bRad, height: bRad, background: grabColor}},
                { class: 'grabber-curl-out-cut', style: { left: grabW, width: bRad, height: bRad, background: '#fff', borderTopLeftRadius: bRad, WebkitBorderTopLeftRadius: bRad, MozBorderTopLeftRadius: bRad}},
                { prop: 'contentSlot', class: 'content-slot', style: {top: grabH, bottom: 0, width: '100%', background: '#fff'}}
            ]
        });

        this.parent = null;
        this.child = new ns.ControlWrapper(domControl);
        this.dom.contentSlot.appendChild(this.child.domRoot());
        this.grabberClickListener = function(){
            this.parent.unpair().float(); //add mouse move listener to the floatingRegion when the floating region is created
        }.bind(this);
        this.dom.grabber.addEventListener('mousedown', this.grabberClickListener, false);
    };


    ns.ContentRegion.prototype = Object.create(ns.Dom.prototype);


})(NS);