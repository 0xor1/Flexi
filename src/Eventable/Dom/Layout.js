/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 25/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        ;


    ns.Layout = function(layoutConfig){

        if(ns.Layout.current){
            return ns.Layout.current;
        }

        var sWidth = ns.Layout.style.splitterWidth + 'px'
            , htmlAndBodyStyle = {
                position: 'absolute',
                overflow: 'hidden',
                margin: 0,
                border: 0,
                padding:0,
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }
            ;

        ns.Dom.call(this,{
            tag: 'div', id: 'layout-root', style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'auto', background: ns.Layout.style.colors.splitter.toStyle() },
            children: [
                { tag: 'div', id: 'floating-region-anchor', style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.style.colors.splitter.toStyle() } },
                { tag: 'div', id: 'context-menu-anchor', style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.style.colors.splitter.toStyle() } },
                { tag: 'div', id: 'dialog-box-anchor', style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.style.colors.splitter.toStyle() } }
            ]
        });

        //clear body
        if(document.body.hasChildNodes()){
            var children = document.body.childNodes;
            for(var i = children.length - 1; i > -1; i--){
                document.body.removeChild(children[i]);
            }
        }
        //style doc element
        ns.Dom.style(document.documentElement, htmlAndBodyStyle);
        //style body element
        ns.Dom.style(document.body, htmlAndBodyStyle);

        //actual members
        this.rootRegion = new ns.RootRegion();
        this.selectedRegion = null;
        this.selectedRegions = [];
        this.floatingRegions = [];
        this.windowedRegions = [];
        this.dialogBoxes = [];
        this.contextMenu = null;

        //draw layout to page
        this.dom.insertBefore(this.rootRegion.dom, this.dom.children[0]);
        document.body.appendChild(this.dom);

        ns.Layout.current = this;
    };


    function HSLA(h, s, l, a){
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a || 1;
    }


    HSLA.prototype = {
        toStyle: function(){
            return "hsla("+this.h+", "+this.s+"%, "+this.l+ "%, "+this.a+")";
        }
    };


    function RGBA(r, g, b, a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1;
    }


    RGBA.prototype = {
        toStyle: function(){
            return "rgba("+this.r+", "+this.g+", "+this.b+ ", "+this.a+")";
        }
    };


    ns.Layout.style = {
        colors: {
            splitter: new RGBA(48,48,48),
            header: new RGBA(0,0,0),
            tabBar: new RGBA(0,0,0),
            tab: new RGBA(70,70,70),
            selectedTab: new RGBA(150, 70, 0)
        },
        splitterWidth: '6',
        tabHeight: '20px',
        headerHeight: '20px'
    };


    ns.Layout.events = {
        resize: 'resize'
    }

    ns.Layout.prototype = Object.create(ns.Dom.prototype);


    ns.Layout.prototype.newRegion = function(domControl){

    };

    ns.Layout.prototype.embedRegion = function(region){
        this.rootRegion.addChild(region);
        ns.Layout.prototype.embedRegion = function(){};
    };


    ns.Layout.prototype.floatRegion = function(region){
        this.floatingRegions.push(new ns.FloatingRegion(region));
    };


})(NS);