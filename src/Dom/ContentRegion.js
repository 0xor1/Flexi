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
            , grabColor = ns.Layout.style.colors.grabber.toStyle()
            , splitterColor = ns.Layout.style.colors.splitter.toStyle()
            ;

        ns.Dom.call(this, {
            class: 'content-region', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, width:'calc(100% - 2px)', height:'calc(100% - 2px)', border: '1px solid '+grabColor, background: splitterColor},
            children: [
                { prop: 'contentSlot', class: 'content-slot', style: { height: '100%', width: '100%', background: splitterColor}},
                { prop: 'grabber', class: 'grabber', style: { right: 0, borderBottomLeftRadius: bRad, WebkitBorderBottomLeftRadius: bRad, MozBorderBottomLeftRadius: bRad, width: grabW, height: grabH, background: grabColor}},
                { prop: 'grabberCurlOutFill', class: 'grabber-curl-out-fill', style: { right: grabW, width: bRad, height: bRad, background: grabColor}},
                { class: 'grabber-curl-out-cut', style: { right: grabW, width: bRad, height: bRad, background: splitterColor, borderTopRightRadius: bRad, WebkitBorderTopRightRadius: bRad, MozBorderTopRightRadius: bRad}}
            ]
        });

        this.parent = null;
        this.child = new ns.ControlWrapper(domControl);
        this.dom.contentSlot.appendChild(this.child.domRoot());
        this.mouseMoveListener = function(event){
            var dom = this.parent.parent.domRoot()
                , rect = dom.getBoundingClientRect()
                , left = ((event.clientX - rect.width - 10)*100/window.innerWidth)+100
                , left = (left < 103 - (rect.width*100/window.innerWidth)) ? 103 - (rect.width*100/window.innerWidth) : left
                , top = (event.clientY + 10)*100/window.innerHeight
                , top = (top > 97) ? 97 : top
                ;
            dom.style.left = left + '%';
            dom.style.top = top + '%';
        }.bind(this);
        this.releaseGrabListener = function(){
            window.removeEventListener('mousemove', this.mouseMoveListener);
            window.removeEventListener('mousedown', this.releaseGrabListener);
            ns.PairableRegion.grabbedRegion = null;
        }.bind(this);
        this.grabberClickListener = function(){
            var self = this;
            if(!(this.parent.parent instanceof ns.FloatingRegion)){
                this.parent.float();
            }
            window.addEventListener('mousemove', this.mouseMoveListener, false);
            setTimeout(function(){
                window.addEventListener('mousedown', self.releaseGrabListener, false);
            },0);
            ns.PairableRegion.grabbedRegion = this.parent;
        }.bind(this);
        this.dom.grabber.addEventListener('mousedown', this.grabberClickListener, false);
    };


    ns.ContentRegion.prototype = Object.create(ns.Dom.prototype);


})(NS);