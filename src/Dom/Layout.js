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

        ns.Dom.call(this,{
            id: 'layout-root', style: { height: '100%', width: '100%', background: ns.Layout.style.colors.splitter.toStyle() },
            children: [
                { prop: 'floatAnchor', id: 'floating-region-anchor', style: { height: '100%', width: '100%', left:'-100%', overflow: 'visible'} },
                { prop: 'contextMenuAnchor', id: 'context-menu-anchor', style: { height: '100%', width: '100%', left:'-100%', overflow: 'visible'} },
                { prop: 'dialogBoxAnchor', id: 'dialog-box-anchor', style: { height: '100%', width: '100%', left:'-100%', overflow: 'visible' } }
            ]
        });

        //add default style for all flexi elements
        var styleNode = document.createElement('style');
        styleNode.appendChild(document.createTextNode('html, body {width: 100%; height: 100%;} html, body, div.' + NS.toLowerCase() + '{position: absolute; margin: 0; border: 0; padding: 0; overflow: hidden; font-family: verdana, arial, sans-serif;}'));
        styleNode.type = 'text/css';
        document.head.appendChild(styleNode);

        //clear body
        if(document.body.hasChildNodes()){
            var children = document.body.childNodes;
            for(var i = children.length - 1; i > -1; i--){
                document.body.removeChild(children[i]);
            }
        }

        //actual members
        this.rootRegion = new ns.RootRegion();
        this.dom.root.insertBefore(this.rootRegion.domRoot(), this.dom.floatAnchor);
        this.selectedRegion = null;
        this.selectedRegions = [];
        this.floatingRegions = [];
        this.windowedRegions = [];
        this.dialogBoxes = [];
        this.contextMenu = null;

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
            splitter: new RGBA(15,45,80),
            header: new RGBA(15,65,120),
            tabBar: new RGBA(15,45,80),
            tab: new RGBA(250,250,250, 0.8),
            selectedTab: new RGBA(250, 250, 250),
            pairedRegionResizeOverlay: new RGBA(200,200,200,0.4)
        },
        splitterWidth: 6,
        tabHeight: '20px',
        tabWidth: '80px',
        headerHeight: '20px',
        regionBorderRadius: '5px'
    };


    ns.Layout.events = {
        resize: 'resize'
    }

    ns.Layout.prototype = Object.create(ns.Dom.prototype);


    ns.Layout.prototype.render = function(){
        document.body.appendChild(this.domRoot());
    }


    ns.Layout.prototype.newRegion = function(domControl){

    };

    ns.Layout.prototype.embedRegion = function(region){
        if(this.rootRegion.child){throw new Error("Cant embed a region as the root Region already contains a child")}
        this.rootRegion.addChild(region);
    };


    ns.Layout.prototype.floatRegion = function(region){
        this.floatingRegions.push(new ns.FloatingRegion(region));
    };

    ns.Layout.prototype.groupRegions = function(first, second, orientation){
        return new ns.GroupedRegion(first, second, orientation);
    };


})(NS);